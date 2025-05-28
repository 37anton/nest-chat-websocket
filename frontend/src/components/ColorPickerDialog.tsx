import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { HexColorPicker } from "react-colorful"
import { useState } from "react"

interface ColorPickerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ColorPickerDialog({ open, onOpenChange }: ColorPickerDialogProps) {
  const [color, setColor] = useState("#a78bfa")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[320px] bg-white">
        <DialogHeader>
          <DialogTitle>Choisis ta couleur préférée</DialogTitle>
        </DialogHeader>
        <HexColorPicker color={color} onChange={setColor} />
        <p className="mt-4 text-sm">
          Couleur sélectionnée : <span className="font-medium">{color}</span>
        </p>
      </DialogContent>
    </Dialog>
  )
}