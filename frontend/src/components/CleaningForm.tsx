import { FormEvent, useState } from 'react';

interface CleaningFormProps {
  isSubmitting: boolean;
  onSubmit: (values: { bagsCollected: number; photoUrl?: string; notes?: string }) => void;
}

export function CleaningForm({ isSubmitting, onSubmit }: CleaningFormProps) {
  const [bagsCollected, setBagsCollected] = useState(2);
  const [photoUrl, setPhotoUrl] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  onSubmit({ bagsCollected, photoUrl: photoUrl || undefined, notes: notes || undefined });
  };

  return (
    <form
      className="cleaning-form"
      onSubmit={handleSubmit}
    >
      <label>
        Pokar safnað
        <input
          type="number"
          min={1}
          max={25}
          value={bagsCollected}
          onChange={(event) => setBagsCollected(Number(event.target.value))}
          required
        />
      </label>

      <label>
        Ljósmynd (slóð)
        <input
          type="url"
          placeholder="https://"
          value={photoUrl}
          onChange={(event) => setPhotoUrl(event.target.value)}
        />
      </label>

      <label>
        Athugasemdir
        <textarea
          placeholder="Lýstu hreinsuninni stuttlega"
          value={notes}
          maxLength={500}
          onChange={(event) => setNotes(event.target.value)}
        />
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Skrái...' : 'Skrá hreinsun'}
      </button>
    </form>
  );
}
