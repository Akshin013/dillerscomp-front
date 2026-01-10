"use client";
import { useState } from "react";
import { verifyEmail } from "../../../Services/auth.js";

export default function VerifyPage() {
  const [code, setCode] = useState("");

  const submit = async () => {
    await verifyEmail(code);
    alert("Email подтверждён");
  };

  return (
    <>
      <input placeholder="Код" onChange={e => setCode(e.target.value)} />
      <button onClick={submit}>Подтвердить</button>
    </>
  );
}
