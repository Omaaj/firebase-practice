import React from 'react'
import Auth from './components/Auth'
import Database from './components/Database'
import StorageFile from './components/StorageFile'

export default function App() {
  return (
    <div>
      <Auth />
      <hr />
      <Database />
      <hr />
      <StorageFile />
    </div>
  )
}
