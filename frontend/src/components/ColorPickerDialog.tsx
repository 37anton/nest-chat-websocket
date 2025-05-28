import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { HexColorPicker } from "react-colorful"
import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"

interface ColorPickerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ColorPickerDialog({ open, onOpenChange }: ColorPickerDialogProps) {
  const [color, setColor] = useState("#a78bfa")

  // Charger la couleur actuelle de l'utilisateur (depuis localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      if (user.color) setColor(user.color)
    }
  }, [open]) // à chaque ouverture, recharge la couleur

  const handleSave = async () => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) return

    const user = JSON.parse(storedUser)

    try {
      await axios.patch(`http://localhost:3000/auth/users/${user.id}/color`, { color })

      // mettre à jour localStorage
      const updatedUser = { ...user, color }
      localStorage.setItem("user", JSON.stringify(updatedUser))

      onOpenChange(false)
    } catch (err) {
      console.error("Erreur lors de la sauvegarde de la couleur", err)
    }
  }

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
        <Button className="mt-4 w-full" onClick={handleSave}>
          Enregistrer
        </Button>
      </DialogContent>
    </Dialog>
  )
}