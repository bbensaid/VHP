import { redirect } from 'next/navigation';

export default function SystemVitalsRedirect() {
  redirect('/bed-capacity');
}
