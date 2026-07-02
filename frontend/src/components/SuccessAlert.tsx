interface Props {
  message?: string | null;
}

//mensajes success
export default function SuccessAlert({ message }: Props) {
  if (!message) return null;
  return (
    <div
      role="status"
      className="rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700"
    >
      {message}
    </div>
  );
}
