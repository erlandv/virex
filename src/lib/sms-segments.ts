/** GSM 03.38 segment estimation for planning previews (not a carrier tariff quote). */
export interface SmsSegments {
  encoding: 'GSM-7' | 'Unicode (UCS-2)';
  chars: number;
  segments: number;
  units: number;
}

// The escape table consumes two septets per character.
const GSM_BASIC = new Set(
  Array.from(
    '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\\"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§`¿abcdefghijklmnopqrstuvwxyzäöñüà'
  )
);
const GSM_EXTENDED = new Set(Array.from('^{}\\\\[~]|€\f'));

export function calculateSmsSegments(message: string): SmsSegments {
  if (!message) return { encoding: 'GSM-7', chars: 0, segments: 0, units: 0 };
  let septets = 0;
  let gsm = true;
  for (const character of message) {
    if (GSM_BASIC.has(character)) septets += 1;
    else if (GSM_EXTENDED.has(character)) septets += 2;
    else {
      gsm = false;
      break;
    }
  }
  // JS length counts UTF-16 code units including emoji surrogate pairs.
  const units = gsm ? septets : message.length;
  const maxSingle = gsm ? 160 : 70;
  const maxMultipart = gsm ? 153 : 67;
  return {
    encoding: gsm ? 'GSM-7' : 'Unicode (UCS-2)',
    chars: Array.from(message).length,
    units,
    segments: units <= maxSingle ? 1 : Math.ceil(units / maxMultipart),
  };
}
