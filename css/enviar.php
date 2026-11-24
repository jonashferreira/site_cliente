<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método não permitido.']);
    exit;
}

// Coleta e higienização dos dados
$nome     = trim(strip_tags($_POST['nome'] ?? ''));
$email    = trim(filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL));
$telefone = trim(strip_tags($_POST['telefone'] ?? 'Não informado'));
$assunto  = trim(strip_tags($_POST['assunto'] ?? ''));
$mensagem = trim(strip_tags($_POST['mensagem'] ?? ''));

// Validação básica
if (empty($nome) || empty($email) || empty($assunto) || empty($mensagem) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Por favor, preencha todos os campos obrigatórios corretamente.']);
    exit;
}

// ============================================================
// CONFIGURAÇÕES LOCAWEB (AJUSTE PARA O DOMÍNIO REAL)
// ============================================================
$destinatario = 'mail@rmgadvogados.com.br'; // E-mail que vai receber a mensagem
$remetente    = 'mail@rmgadvogados.com.br'; // OBRIGATÓRIO ser uma conta criada no seu domínio Locaweb

$titulo_email = "Contato pelo Site: " . $assunto;

$corpo_email  = "Você recebeu uma nova mensagem através do formulário de contato do site:\n\n";
$corpo_email .= "Nome: {$nome}\n";
$corpo_email .= "E-mail: {$email}\n";
$corpo_email .= "Telefone: {$telefone}\n";
$corpo_email .= "Assunto: {$assunto}\n\n";
$corpo_email .= "Mensagem:\n{$mensagem}\n";

// Cabeçalhos compatíveis com o servidor SMTP/Sendmail da Locaweb
$headers  = "MIME-Version: 1.1\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "From: RMG Advogados <{$remetente}>\r\n";
$headers .= "Return-Path: {$remetente}\r\n";
$headers .= "Reply-To: {$nome} <{$email}>\r\n";

// O 5º parâmetro "-r" é exigido pela Locaweb para evitar bloqueio por anti-spam
$enviado = mail($destinatario, '=?UTF-8?B?' . base64_encode($titulo_email) . '?=', $corpo_email, $headers, "-r" . $remetente);

if ($enviado) {
    echo json_encode(['status' => 'success', 'message' => 'Mensagem enviada com sucesso. Nossa equipe retornará em breve.']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato por telefone.']);
}