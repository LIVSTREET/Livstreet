

## Diagnose

Fra Domeneshop cPanel ser jeg de korrekte SMTP-innstillingene for `post@livstreet.no`:

- **SMTP-server:** `ymirsgren.domene.no` (IKKE `smtp.domeneshop.no` eller `mail.livstreet.no`)
- **Port med SSL:** `465`
- **Brukernavn:** `post@livstreet.no` (full e-postadresse)
- **Passord:** Det du satte i cPanel for denne kontoen

Loggen viser fortsatt `535: Incorrect authentication data`. Dette betyr at minst én av disse tre verdiene er feil i secrets:

1. `SMTP_HOST` — må være **`ymirsgren.domene.no`**
2. `SMTP_USERNAME` — må være **`post@livstreet.no`**
3. `SMTP_PASSWORD` — må være passordet du satte for `post@livstreet.no` i cPanel (ikke Domeneshop-kontopassordet, ikke webmail-passord til en annen konto)

`SMTP_PORT=465` er allerede riktig.

## Plan

Jeg vil verifisere/oppdatere alle tre SMTP-secrets slik at de matcher nøyaktig det cPanel viser:

1. **Sjekke nåværende `SMTP_HOST`** — hvis den ikke er `ymirsgren.domene.no`, oppdatere den.
2. **Sjekke nåværende `SMTP_USERNAME`** — hvis den ikke er `post@livstreet.no` (full adresse), oppdatere den.
3. **Be deg sette `SMTP_PASSWORD` på nytt** — bruk passordet du satte for `post@livstreet.no` i cPanel. Hvis du er usikker, kan du resette det via cPanel → E-Postkontoer → Behandle → Endre passord, og deretter lime inn det nye passordet i secret.

Etter oppdatering: send test-innsending fra `/komponer`, så bekrefter jeg i loggen at `535`-feilen er borte og at e-post leveres til både kunde og admin.

### Teknisk

- Koden i `supabase/functions/send-inquiry/index.ts` er allerede korrekt: bruker `SMTP_PORT === 465 ? implicit TLS : STARTTLS`, autentiserer med `SMTP_USERNAME`/`SMTP_PASSWORD`, og sender FROM `SMTP_FROM` (default `Livstreet <SMTP_USERNAME>`).
- Ingen kodeendringer trengs — kun secrets må stemme.
- `denomailer` returnerer `535` utelukkende når SMTP-serveren avviser brukernavn/passord-kombinasjonen, så feilen er ikke nettverksrelatert.

