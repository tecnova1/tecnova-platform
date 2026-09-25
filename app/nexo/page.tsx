import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Nexo Cívico — TECNOVA',
  description: 'Instrumento territorial del método TECNOVA.',
};

export default function NexoPage() {
  redirect('https://tecnova-civic-link.vercel.app');
}
