"use client"

import { useState } from "react"
import { CalendarIcon, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { PhoneInput } from "@/components/ui/phone-input"


interface Props {
  title?:string;
  subtitle?:string;
}
export default function AppointmentForm({title='Schedule Your Appointment', subtitle='Shaping Signature Lifestyles | Unmatched Expertise'}: Props) {
  const [appointmentType, setAppointmentType] = useState("in-person")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [consent, setConsent] = useState(false)

  const timeSlots = [
    "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate) {
      alert("Please select a date.")
      return
    }
    if (!selectedTime) {
      alert("Please select a time.")
      return
    }
    if (!name.trim()) {
      alert("Please enter your name.")
      return
    }
    if (!email.trim()) {
      alert("Please enter your email.")
      return
    }
    if (!consent) {
      alert("You must consent to storing your information.")
      return
    }

    const formData = {
      appointmentType,
      date: selectedDate.toISOString(),
      time: selectedTime,
      name,
      email,
      phone,
      message,
      consent,
    }
    console.log("Form submitted", formData)
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mb-10 overflow-x-hidden">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-normal mb-2">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date Picker */}
          <div className="flex flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "pl-3 text-left font-normal h-12 rounded-md hover:bg-transparent w-full",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] max-w-[90vw] p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date || undefined)}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selector */}
          <div className="w-full h-full">
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="min-h-12 w-full rounded-md border px-3 flex items-center justify-between">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Appointment Type Toggle */}
        <div className="flex justify-center mb-2">
          <div className="flex border rounded-md overflow-hidden">
            <button
              type="button"
              onClick={() => setAppointmentType("in-person")}
              className={cn(
                "px-8 py-3 text-sm font-medium transition-colors",
                appointmentType === "in-person"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              )}
            >
              In Person
            </button>
            <button
              type="button"
              onClick={() => setAppointmentType("video-chat")}
              className={cn(
                "px-8 py-3 text-sm font-medium transition-colors",
                appointmentType === "video-chat"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              )}
            >
              Video Chat
            </button>
          </div>
        </div>

        {/* Name Input */}
        <Input
          placeholder="Name"
          className="h-12 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="email"
            placeholder="Email"
            className="h-12 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PhoneInput
            className="h-12"
            value={phone}
            onChange={setPhone}
          />
        </div>

        {/* Message */}
        <Textarea
          placeholder="Your Message"
          className="min-h-[180px] rounded-md resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Consent Checkbox */}
        <div className="flex items-start space-x-3">
          <Checkbox
            id="consent"
            checked={consent}
            onCheckedChange={(checked) => setConsent(Boolean(checked))}
          />
          <label htmlFor="consent" className="text-sm font-medium leading-none">
            I consent to have this website store my information.
          </label>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full h-14 rounded-md bg-black text-white hover:bg-black/90">
          Book Appointment
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
