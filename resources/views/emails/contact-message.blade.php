@component('mail::message')
# Jauna ziņa no mājaslapas

**Vārds:** {{ $name ?: 'Nav norādīts' }}  
**E-pasts:** {{ $email }}  
**Temats:** {{ $subject ?? 'Nav norādīts' }}

---

{{ $messageContent }}

@component('mail::subcopy')
Šī ziņa tika nosūtīta no mājaslapas kontaktformas.
@endcomponent
@endcomponent
