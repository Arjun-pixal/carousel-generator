"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface EditableTextProps {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
  multiline?: boolean
}

export default function EditableText({
  value,
  onChange,
  className = "",
  placeholder = "",
  multiline = false,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    setEditValue(value)
  }, [value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      if (multiline && inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.setSelectionRange(editValue.length, editValue.length)
      } else if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.setSelectionRange(editValue.length, editValue.length)
      }
    }
  }, [isEditing, editValue.length, multiline])

  const handleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
    onChange(editValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault()
      setIsEditing(false)
      onChange(editValue)
    } else if (e.key === "Escape") {
      setIsEditing(false)
      setEditValue(value)
    }
  }

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${className} bg-transparent border-none outline-none resize-none w-full`}
          placeholder={placeholder}
          rows={4}
        />
      )
    } else {
      return (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${className} bg-transparent border-none outline-none w-full`}
          placeholder={placeholder}
        />
      )
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`${className} cursor-text hover:bg-white hover:bg-opacity-10 rounded-lg px-3 py-2 transition-all duration-200 min-h-[2rem] flex items-center`}
    >
      {value || <span className="opacity-60 italic">{placeholder}</span>}
    </div>
  )
}
