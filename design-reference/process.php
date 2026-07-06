<?php
/**
 * process.php — OpusSignals.com unified form handler
 * Handles submissions from: Institutional Consulting form, FAQ Question form,
 * and General Contact form. Sends email via SMTP to the configured recipient.
 *
 * IMPORTANT — Roy: this file expects an SMTP-capable mailer. The example below
 * uses PHPMailer (https://github.com/PHPMailer/PHPMailer), the most common
 * choice for SMTP on shared/standard PHP hosting. If your other sites already
 * use a different mailer/library, swap the "SEND EMAIL" section below to match
 * — the validation, sanitization, and JSON response logic above it can stay as-is.
 *
 * Install PHPMailer via Composer (recommended):
 *   composer require phpmailer/phpmailer
 * Or drop in the PHPMailer source files manually and adjust the require_once paths.
 */

// ── CORS / response headers ─────────────────────────────────────────────
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://opussignals.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Preflight request support
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed.']);
    exit;
}

// ── SMTP CONFIGURATION — Roy: fill these in to match your existing SMTP setup ──
const SMTP_HOST       = 'smtp.yourprovider.com';   // e.g. smtp.gmail.com, mail.yourdomain.com
const SMTP_PORT       = 587;                       // 587 (TLS) or 465 (SSL) typically
const SMTP_USERNAME   = 'your-smtp-username';
const SMTP_PASSWORD   = 'your-smtp-password';
const SMTP_ENCRYPTION = 'tls';                     // 'tls' or 'ssl'
const SMTP_FROM_EMAIL = 'noreply@opussignals.com'; // sender address shown on the email
const SMTP_FROM_NAME  = 'OpusSignals.com';
const RECIPIENT_EMAIL = 'karim.pirani@investorchatter.com';

// ── Read and decode incoming data (supports both JSON and form-encoded POSTs) ──
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (strpos($contentType, 'application/json') !== false) {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true) ?? [];
} else {
    $data = $_POST;
}

// ── Determine form type and validate required fields accordingly ──
$formType = trim($data['form_type'] ?? 'General Contact');

function sanitize($value) {
    return htmlspecialchars(trim((string) $value), ENT_QUOTES, 'UTF-8');
}

function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

$errors = [];
$subject = '';
$bodyLines = [];

if ($formType === 'Institutional Consulting') {
    $institution  = sanitize($data['institution'] ?? '');
    $managerName  = sanitize($data['manager_name'] ?? '');
    $title        = sanitize($data['title'] ?? '');
    $instType     = sanitize($data['inst_type'] ?? '');
    $email        = sanitize($data['email'] ?? '');
    $phone        = sanitize($data['phone'] ?? '');
    $comments     = sanitize($data['comments'] ?? '');

    if ($institution === '') $errors[] = 'Institution name is required.';
    if ($managerName === '') $errors[] = 'Manager name is required.';
    if ($title === '') $errors[] = 'Title is required.';
    if (!isValidEmail($email)) $errors[] = 'A valid email address is required.';
    if ($phone === '') $errors[] = 'Phone number is required.';

    $subject = 'OpusSignals — Institutional Consulting Inquiry';
    $bodyLines = [
        "New institutional consulting inquiry:",
        "",
        "Institution: $institution",
        "Manager Name: $managerName",
        "Title: $title",
        "Institution Type: " . ($instType ?: '(not specified)'),
        "Email: $email",
        "Phone: $phone",
        "",
        "Message:",
        $comments ?: '(none provided)',
    ];
    $replyToEmail = $email;
    $replyToName  = $managerName;

} elseif ($formType === 'FAQ Question' || $formType === 'General Contact') {
    $name    = sanitize($data['name'] ?? '');
    $email   = sanitize($data['email'] ?? '');
    $topic   = sanitize($data['topic'] ?? '');
    $message = sanitize($data['message'] ?? '');

    if ($name === '') $errors[] = 'Name is required.';
    if (!isValidEmail($email)) $errors[] = 'A valid email address is required.';
    if ($topic === '') $errors[] = 'Topic is required.';
    if ($message === '') $errors[] = 'Message is required.';

    $label = $formType === 'FAQ Question' ? 'FAQ' : 'Contact';
    $subject = "OpusSignals $label — $topic";
    $bodyLines = [
        "New $formType submission:",
        "",
        "Name: $name",
        "Email: $email",
        "Topic: $topic",
        "",
        "Message:",
        $message,
    ];
    $replyToEmail = $email;
    $replyToName  = $name;

} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Unrecognized form type.']);
    exit;
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => implode(' ', $errors)]);
    exit;
}

$emailBody = implode("\n", $bodyLines);

// ── SEND EMAIL via SMTP (PHPMailer) ─────────────────────────────────────
// Roy: adjust this block to match whichever mailer your other sites already use.
require_once __DIR__ . '/vendor/autoload.php'; // Composer autoload, if using Composer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USERNAME;
    $mail->Password   = SMTP_PASSWORD;
    $mail->SMTPSecure = SMTP_ENCRYPTION === 'ssl'
        ? PHPMailer::ENCRYPTION_SMTPS
        : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = SMTP_PORT;

    $mail->setFrom(SMTP_FROM_EMAIL, SMTP_FROM_NAME);
    $mail->addAddress(RECIPIENT_EMAIL);
    if (!empty($replyToEmail)) {
        $mail->addReplyTo($replyToEmail, $replyToName);
    }

    $mail->Subject = $subject;
    $mail->Body    = $emailBody;
    $mail->isHTML(false);

    $mail->send();

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    http_response_code(500);
    error_log('OpusSignals process.php mail error: ' . $mail->ErrorInfo);
    echo json_encode(['success' => false, 'error' => 'The message could not be sent. Please try again shortly.']);
}
