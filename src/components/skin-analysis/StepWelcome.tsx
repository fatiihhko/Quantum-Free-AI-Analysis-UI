import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Camera, Upload, Sparkles } from "lucide-react";
import { Translations } from "@/lib/translations";

interface StepWelcomeProps {
  t: Translations;
  onStart: (photo: string) => void;
}

export default function StepWelcome({ t, onStart }: StepWelcomeProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) handleFile(file);
    },
    [handleFile]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center px-4 pt-8 pb-12 max-w-lg mx-auto relative"
    >
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-2xl md:text-3xl font-display font-semibold text-foreground text-center leading-tight tracking-tight mb-2"
      >
        {t.step1Title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="text-sm text-muted-foreground text-center max-w-md mb-1 leading-relaxed"
      >
        {t.step1Sub}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-[11px] text-muted-foreground/75 text-center max-w-sm mb-6 italic"
      >
        {t.step1Tip}
      </motion.p>

      {/* Upload area – beauty-tech focal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.45, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`w-full max-w-sm aspect-[3/4] rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer relative overflow-hidden ${
          dragging
            ? "border-primary bg-primary/5 shadow-glow"
            : "border-border/70 bg-card shadow-elevated hover:border-primary/30 hover:shadow-card"
        }`}
        onClick={() => fileRef.current?.click()}
      >
        {!preview && <div className="absolute inset-0 shimmer rounded-2xl pointer-events-none" />}

        {preview ? (
          <img src={preview} alt="" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
        ) : (
          <>
            <div className="w-28 h-32 rounded-[50%] border border-dashed border-primary/15 mb-1 relative overflow-hidden">
              <div className="absolute inset-0 rounded-[50%] bg-primary/[0.02]" />
            </div>
            <p className="text-[11px] text-muted-foreground/70">{t.faceGuide}</p>
            <p className="text-sm text-muted-foreground font-medium">{t.uploadDrag}</p>
            <p className="text-[11px] text-muted-foreground/60">{t.uploadOr}</p>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileRef.current?.click();
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl border border-border/60 text-foreground bg-card hover:bg-muted/40 transition-colors"
              >
                <Upload size={13} /> {t.uploadPhoto}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  cameraRef.current?.click();
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl border border-border/60 text-foreground bg-card hover:bg-muted/40 transition-colors"
              >
                <Camera size={13} /> {t.uploadCamera}
              </button>
            </div>
          </>
        )}
      </motion.div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />

      {preview && (
        <motion.button
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          onClick={() => onStart(preview)}
          className="mt-5 px-8 py-3.5 rounded-xl font-display font-semibold text-sm text-primary-foreground btn-premium flex items-center gap-2"
        >
          <Sparkles size={15} />
          {t.ctaStart}
        </motion.button>
      )}
    </motion.div>
  );
}
