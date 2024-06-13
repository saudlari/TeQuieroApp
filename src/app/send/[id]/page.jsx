'use client'
import PhotoBooth from '@/components/PhotoBooth'
import contacts from '@/contacts'

export default function Page({params}) {
  const { id } = params
  const name = contacts.filter(
    contact => 
      contact.id == id
    )[0].name
  return (
    <>
      {name}
      <PhotoBooth />
    </>
  )
}
