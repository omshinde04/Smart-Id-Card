"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function VerifyPage({ params }) {
  const { enrollment } = params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch(`/api/verify?enrollment=${enrollment}`)
    .then((res) => res.json())
    .then((res) => {
      setData(res);
      setLoading(false);
    })
    .catch(() => {
      setData({ valid: false, message: "Unable to connect to server" });
      setLoading(false);
    });
}, [enrollment]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Verifying ID...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-center">

        {data.valid ? (
          <>
            <CheckCircle className="mx-auto text-green-500" size={64} />
            <h1 className="text-2xl font-bold mt-3 text-green-400">
              ID VERIFIED
            </h1>

            <div className="mt-4 text-left text-sm space-y-2">
              <p><b>Name:</b> {data.student.name}</p>
              <p><b>Branch:</b> {data.student.branch}</p>
              <p><b>Year:</b> {data.student.year}</p>
              <p><b>Email:</b> {data.student.email}</p>
              <p><b>Mobile:</b> {data.student.mobile}</p>
              <p><b>Enrollment:</b> {enrollment}</p>
            </div>
          </>
        ) : (
          <>
            <XCircle className="mx-auto text-red-500" size={64} />
            <h1 className="text-2xl font-bold mt-3 text-red-400">
              INVALID ID
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              {data.message}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
