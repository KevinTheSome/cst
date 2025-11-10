<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMessage extends Mailable
{
    use Queueable;
    use SerializesModels;

    public array $payload;

    public function __construct(array $payload)
    {
        $this->payload = $payload;
    }

    public function build(): self
    {
        $name = $this->payload['name'] ?? null;
        $subject = $this->payload['subject'] ?? 'Jauna ziņa no mājaslapas';

        return $this->from(config('mail.from.address'), config('mail.from.name'))
            ->subject($subject)
            ->replyTo($this->payload['email'], $name ?: null)
            ->markdown('emails.contact-message', [
                'name' => $name,
                'email' => $this->payload['email'],
                'subject' => $subject,
                'messageContent' => $this->payload['message'],
            ]);
    }
}
