import React from "react";

interface EndInfoProps {
  side: "A" | "B";
  state: any;
}

export default function EndInfo({ side, state }: EndInfoProps) {
  const dash = String(state.idDash || '').replace('-', '');
  const tubeOrThread = side === 'A' ? state.fittingAThread : state.fittingBThread;
  const code = side === 'A' ? state.fittingAEnd : state.fittingBEnd;
  const std = side === 'A' ? state.fittingAStd : state.fittingBStd;

  let example46 = '';
  let example48 = '';
  if (code && dash) {
    if (std?.startsWith('DIN')) {
      example46 = `1${code}46-${tubeOrThread}-${dash}`;
      example48 = `1${code}48-${tubeOrThread}-${dash}`;
    } else if (std === 'BSP') {
      const family = (code === 'B1') ? '1B1' : (code === 'B2') ? '1B2' : (code === 'B4') ? '1B4' : (code === '92') ? '192' : (code === 'EA') ? '1EA' : (code === 'EB') ? '1EB' : (code === 'D9') ? '1D9' : (code === 'B5') ? '1B5' : '';
      example46 = family ? `${family}46-${dash}-${dash}` : '';
      example48 = family ? `${family}48-${dash}-${dash}` : '';
    } else if (std === 'ORFS') {
      const family = (code === 'J9') ? '1J9' : (code === 'J7') ? '1J7' : (code === 'J1') ? '1J1' : (code === 'J5') ? '1J5' : (code === 'JM') ? '1JM' : (code === 'JD') ? '1JD' : '';
      example46 = family ? `${family}46-${dash}-${dash}` : '';
      example48 = family ? `${family}48-${dash}-${dash}` : '';
    } else if (std === 'JIC') {
      const family =
        code === "03" ? "103" :
        code === "06" ? "106" :
        code === "68" ? "168" :
        code === "37" ? "137" :
        code === "3V" ? "13V" :
        code === "39" ? "139" :
        code === "3W" ? "13W" : "";
      example46 = family ? `${family}46-${dash}-${dash}` : "";
      example48 = family ? `${family}48-${dash}-${dash}` : "";
    }
  }

  const show46 = Boolean(example46);
  const show48 = Boolean(example48);

  return (
    <div className="space-y-2 text-sm">
      <div className="rounded-xl border p-2 bg-muted/30">
        <div className="text-xs mb-1">Mini-opslag (tabeludsnit)</div>
        <div className="h-24 w-full grid place-items-center text-muted-foreground">
          (thumbnail indsættes ved import)
        </div>
      </div>
      {show46 && (
        <div className="rounded-xl border p-3">
          <div className="font-mono text-base">{example46}</div>
          <div className="text-muted-foreground">Eksempel på 46-serie partnr. fra tabellerne.</div>
        </div>
      )}
      {show48 && (
        <div className="rounded-xl border p-3">
          <div className="font-mono text-base">{example48}</div>
          <div className="text-muted-foreground">48-serie variant (hvis anvendt).</div>
        </div>
      )}
      {!show46 && !show48 && (
        <div className="rounded-xl border p-3 bg-amber-50 border-amber-200">
          Vælg standard, kode og størrelse for at se partnr.
        </div>
      )}
    </div>
  );
}

