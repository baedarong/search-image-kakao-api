"use client";

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <>
      <h1>에러 페이지</h1>
      <h2>{error.message}</h2>
      <button
        onClick={() => {
          reset();
        }}
      >
        새로고침
      </button>
    </>
  );
}
