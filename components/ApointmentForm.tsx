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

export default function AppointmentForm() {
  const [appointmentType, setAppointmentType] = useState("in-person")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string>("")

  const timeSlots = [
    "8:00 AM",
    "8:30 AM", 
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here when you integrate backend
    console.log("Form submitted")
  }

  return (
    <div className="w-full md:w-2/4 mx-auto mb-10 md:mb-50">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-normal mb-2">Schedule Your Appointment</h1>
        <p className="text-gray-600">Shaping Signature Lifestyles | Unmatched Expertise</p>
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
                    "pl-3 text-left font-normal h-12 rounded-md",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  {selectedDate ? format(selectedDate, "dd/MM/yyyy") : <span>dd/mm/yyyy</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selector */}
          <div>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="h-12 rounded-md">
                <SelectValue placeholder="10:00 AM" />
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
              className={`px-8 py-3 text-sm font-medium transition-colors ${
                appointmentType === "in-person" ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              In Person
            </button>
            <button
              type="button"
              onClick={() => setAppointmentType("video-chat")}
              className={`px-8 py-3 text-sm font-medium transition-colors ${
                appointmentType === "video-chat" ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              Video Chat
            </button>
          </div>
        </div>

        {/* Name Input */}
        <div>
          <Input placeholder="Name" className="h-12 rounded-md" />
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input type="email" placeholder="Email" className="h-12 rounded-md" />
          </div>
          <div>
            <PhoneInput className="h-12" />
          </div>
        </div>

        {/* Message */}
        <div>
          <Textarea placeholder="Your Message" className="min-h-[180px] rounded-md resize-none" />
        </div>

        {/* Consent Checkbox */}
        <div className="flex items-start space-x-3">
          <Checkbox id="consent" />
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