interface Props {
  message?: string | null;
}

//mensajes de error
export default function ErrorAlert({ message }: Props) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      {message}
    </div>
  );
}
