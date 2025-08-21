import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Picker from "./components/Picker";
import EndInfo from "./components/EndInfo";
import {
  HOSE_SERIES_OPTIONS,
  COVER_OPTIONS,
  DASH_OPTIONS_462,
  DASH_OPTIONS_797,
  STANDARD_OPTIONS,
  END_CODES_BY_STANDARD,
  DIN_BASE_END_SIZES,
  THREAD_MAP,
} from "./constants";
import { generateHoseStringExact, canBuildExact } from "./utils";

export default function HoseConfiguratorFullExport() {
  const [state, setState] = useState<any>({
    hoseSeries: "",
    cover: "",
    idDash: "",
    unit: "MM",
    length: "",
    fittingAStd: "",
    fittingBStd: "",
    fittingAThread: "",
    fittingBThread: "",
    fittingAEnd: "",
    fittingBEnd: "",
    angleDisplacement: "0",
    accessory: "",
  });

  // Auto series by hose selection
  const seriesValue = state.hoseSeries === "462TC" ? "46" : state.hoseSeries === "797TC" ? "77" : "";

  // Step filters
  const endSizeOptionsA = useMemo(() => {
    if (!state.idDash || !state.fittingAStd) return [] as string[];
    if (state.fittingAStd.startsWith("DIN"))
      return DIN_BASE_END_SIZES[state.fittingAStd]?.[state.idDash] || [];
    return THREAD_MAP[state.fittingAStd]?.[state.idDash] || [];
  }, [state.idDash, state.fittingAStd]);

  const endSizeOptionsB = useMemo(() => {
    if (!state.idDash || !state.fittingBStd) return [] as string[];
    if (state.fittingBStd.startsWith("DIN"))
      return DIN_BASE_END_SIZES[state.fittingBStd]?.[state.idDash] || [];
    return THREAD_MAP[state.fittingBStd]?.[state.idDash] || [];
  }, [state.idDash, state.fittingBStd]);

  const endCodeOptionsA = END_CODES_BY_STANDARD[state.fittingAStd] || [];
  const endCodeOptionsB = END_CODES_BY_STANDARD[state.fittingBStd] || [];

  const canBuild = canBuildExact(state);
  const hoseString = useMemo(
    () => (canBuild ? generateHoseStringExact(state) : "—"),
    [state, canBuild]
  );

  const progress = useMemo(() => {
    let p = 0;
    if (state.hoseSeries) p += 15;
    if (state.cover) p += 10;
    if (state.idDash) p += 15;
    if (state.fittingAStd && state.fittingBStd) p += 20;
    if (state.fittingAThread && state.fittingBThread) p += 15;
    if (state.fittingAEnd && state.fittingBEnd) p += 15;
    if (state.length) p += 10;
    return p;
  }, [state]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-4 md:p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              Hydraulikslange – Konfiguration (Touch, 1→8)
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Guidet flow med auto-filtrering og Parker-streng
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={progress} />

            {/* 1: Slange */}
            <Label>1: Vælg slange</Label>
            <Picker
              label="Slange"
              value={state.hoseSeries}
              options={HOSE_SERIES_OPTIONS}
              onSelect={(v: string) =>
                setState((s: any) => ({
                  ...s,
                  hoseSeries: v,
                  cover: "",
                  idDash: "",
                  fittingAStd: "",
                  fittingBStd: "",
                  fittingAThread: "",
                  fittingBThread: "",
                  fittingAEnd: "",
                  fittingBEnd: "",
                  length: "",
                }))
              }
            />

            {/* 2: Cover */}
            <Label className="mt-2">2: Cover</Label>
            <Picker
              label="Cover"
              value={state.cover}
              options={COVER_OPTIONS}
              onSelect={(v: string) => setState((s: any) => ({ ...s, cover: v }))}
            />

            {/* 3: Dash */}
            <Label className="mt-2">3: Størrelse (dash)</Label>
            <Picker
              label="Dash"
              value={state.idDash}
              options={
                state.hoseSeries === "462TC"
                  ? DASH_OPTIONS_462
                  : state.hoseSeries === "797TC"
                  ? DASH_OPTIONS_797
                  : []
              }
              onSelect={(v: string) => setState((s: any) => ({ ...s, idDash: v }))}
            />

            {/* 4: Standard (A/B) */}
            <Label className="mt-2">4: Fitting standard</Label>
            <Picker
              label="Standard – A"
              value={state.fittingAStd}
              options={STANDARD_OPTIONS}
              onSelect={(v: string) =>
                setState((s: any) => ({
                  ...s,
                  fittingAStd: v,
                  fittingAThread: "",
                  fittingAEnd: "",
                }))
              }
            />
            <Picker
              label="Standard – B"
              value={state.fittingBStd}
              options={STANDARD_OPTIONS}
              onSelect={(v: string) =>
                setState((s: any) => ({
                  ...s,
                  fittingBStd: v,
                  fittingBThread: "",
                  fittingBEnd: "",
                }))
              }
            />

            {/* 5: End size (A/B) */}
            <Label className="mt-2">5: Størrelse på enden</Label>
            <Picker
              label="Endestørrelse – A"
              value={state.fittingAThread}
              options={endSizeOptionsA}
              onSelect={(v: string) =>
                setState((s: any) => ({ ...s, fittingAThread: v }))
              }
            />
            <Picker
              label="Endestørrelse – B"
              value={state.fittingBThread}
              options={endSizeOptionsB}
              onSelect={(v: string) =>
                setState((s: any) => ({ ...s, fittingBThread: v }))
              }
            />

            {/* 6: End configuration (A/B) */}
            <Label className="mt-2">6: Ende-konfiguration (Parker kode)</Label>
            <div className="grid grid-cols-6 gap-2">
              <div className="col-span-5">
                <Picker
                  label="Ende-konfiguration – A"
                  value={state.fittingAEnd}
                  options={endCodeOptionsA}
                  onSelect={(v: string) =>
                    setState((s: any) => ({ ...s, fittingAEnd: v }))
                  }
                />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-14">
                    i
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[55vh] p-4">
                  <SheetHeader>
                    <SheetTitle>Opslag – A</SheetTitle>
                  </SheetHeader>
                  <EndInfo side="A" state={state} />
                </SheetContent>
              </Sheet>
            </div>
            <div className="grid grid-cols-6 gap-2">
              <div className="col-span-5">
                <Picker
                  label="Ende-konfiguration – B"
                  value={state.fittingBEnd}
                  options={endCodeOptionsB}
                  onSelect={(v: string) =>
                    setState((s: any) => ({ ...s, fittingBEnd: v }))
                  }
                />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-14">
                    i
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[55vh] p-4">
                  <SheetHeader>
                    <SheetTitle>Opslag – B</SheetTitle>
                  </SheetHeader>
                  <EndInfo side="B" state={state} />
                </SheetContent>
              </Sheet>
            </div>

            {/* 7: Length */}
            <Label className="mt-2">7: Slangens totale længde</Label>
            <div className="grid grid-cols-3 gap-2">
              <Input
                className="col-span-2 h-14 text-lg"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="fx 1000"
                value={state.length}
                onChange={(e) =>
                  setState((s: any) => ({ ...s, length: e.target.value }))
                }
              />
              <Picker
                label="Enhed"
                value={state.unit}
                options={["MM", "CM", "M"]}
                onSelect={(v: string) =>
                  setState((s: any) => ({ ...s, unit: v }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>8: Preview & genereret streng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="rounded-2xl border bg-white p-4 text-xl font-mono tracking-wide">
              {hoseString}
            </div>
            <div className="text-xs text-muted-foreground">
              Strukturen følger Parker-sekvensen og bruger din valgte prefix-regel (462TC→D, 797TC→F). Når PTS er koblet på, kan vi sende denne streng
              direkte og trigge label-print.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

