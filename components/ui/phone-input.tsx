"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface PhoneInputProps {
  value?: string
  onChange?: (value: string) => void
  className?: string
}

const countries = [
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+1", name: "USA", flag: "🇺🇸" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
]

export function PhoneInput({ value, onChange, className }: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [isOpen, setIsOpen] = useState(false)
  const [internalValue, setInternalValue] = useState("")

  // Use internal state if no value/onChange provided
  const phoneValue = value ?? internalValue
  const handleChange = onChange ?? setInternalValue

  return (
    <div className={cn("flex", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-r-none border-r-0 px-3 h-12 hover:bg-black hover:text-white"
            type="button"
          >
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="text-sm font-medium">{selectedCountry.code}</span>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0" align="start">
          <div className="max-h-[200px] overflow-y-auto">
            {countries.map((country) => (
              <div
                key={country.code}
                className="flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-primary hover:text-white"
                onClick={() => {
                  setSelectedCountry(country)
                  setIsOpen(false)
                }}
              >
                <span className="text-lg">{country.flag}</span>
                <span className="flex-1 text-sm">{country.name}</span>
                <span className="text-sm text-muted-foreground">{country.code}</span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <Input
        type="tel"
        value={phoneValue}
        onChange={(e) => handleChange(e.target.value)}
        className="rounded-l-none h-12"
        placeholder="Phone number"
      />
    </div>
  )
}