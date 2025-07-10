"use client"
import { AuthContext } from '@/app/layout'
import React, { useContext } from 'react'

export default function useAuth() {
  return useContext(AuthContext)
}
