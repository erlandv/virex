/** Optional enterprise lead scope, serialized into the existing CMS lead contract. */
const VOLUMES: Record<string, string> = {
  'not-sure': 'Not yet confirmed',
  '1k-10k': '1,000–10,000',
  '10k-50k': '10,001–50,000',
  '50k-250k': '50,001–250,000',
  '250k-1m': '250,001–1,000,000',
  '1m-plus': 'More than 1,000,000',
};
const CHANNELS: Record<string, string> = {
  whatsapp: 'WhatsApp Cloud',
  sms: 'Bulk SMS',
  instagram: 'Instagram / Messenger',
  'live-chat': 'Website Live Chat',
};
const MPESA: Record<string, string> = {
  unsure: 'Undecided',
  paybill: 'Daraja Paybill',
  till: 'Buy Goods Till',
  pochi: 'Pochi la Biashara',
  none: 'No M-Pesa required',
};
export interface EnterpriseScope {
  volume: string;
  channels: string[];
  mpesaMode: string;
}
export function parseEnterpriseScope(formData: FormData): EnterpriseScope {
  const volumeKey = String(formData.get('scopeSmsVolume') || 'not-sure');
  const modeKey = String(formData.get('scopeMpesaMode') || 'unsure');
  const selected = new Set(formData.getAll('scopeChannel').map((value) => String(value)));
  return {
    volume: VOLUMES[volumeKey] || VOLUMES['not-sure'],
    channels: Object.entries(CHANNELS).filter(([key]) => selected.has(key)).map(([, value]) => value),
    mpesaMode: MPESA[modeKey] || MPESA.unsure,
  };
}
export function formatEnterpriseScope(scope: EnterpriseScope): string {
  return [
    'Enterprise scope (client-selected):',
    'Monthly SMS volume: ' + scope.volume,
    'Channels: ' + (scope.channels.length ? scope.channels.join(', ') : 'Not selected'),
    'M-Pesa mode: ' + scope.mpesaMode,
  ].join('\n');
}
