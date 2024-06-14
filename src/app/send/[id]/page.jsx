'use client'
import PhotoBooth from '@/components/PhotoBooth'
import contacts from '@/contacts'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function Page({params}) {
  const { id } = params
  const toast = useToast()
  const router = useRouter()
  const name = contacts.filter(
    contact => 
      contact.id == id
    )[0].name

  const handleUpload = async (img) => {
    const payload = { 
      image: img,
      userTo: id,
      userFrom: "0"  //To do a userFrom atentification
    }

    const responsePromise = fetch('/api/photo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      console.log('Upload successful:', result);
      router.push('/')
      return result;
    })
    .catch(error => {
      console.error('Error uploading files:', error);
      throw error;
    });

    toast.promise(responsePromise, {
      success: { 
        title: 'Promise resolved', 
        description: 'Looks great',
      },
      error: { title: 'Promise rejected', description: 'Something wrong' },
      loading: { title: 'Promise pending', description: 'Please wait' },
    })
  }

  return (
    <>
      {name}
      <PhotoBooth onUpload={handleUpload} />
    </>
  )
}
