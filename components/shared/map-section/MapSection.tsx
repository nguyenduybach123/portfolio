'use client'

import { useState } from 'react'
import Map, { NavigationControl, Marker } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import Image from 'next/image'

// Import các component Drawer từ thư mục UI của Shadcn
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerFooter
} from '@/components/ui/drawer'

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY

const HCMC_BOUNDS: [[number, number], [number, number]] = [
  [106.356, 10.352],
  [106.846, 11.16]
]

// Dữ liệu mẫu với avatar thumbnail
const FAVORITE_SPOTS = [
  {
    id: 'spot-1',
    name: 'The Sentry P',
    type: 'Không gian sự kiện & Co-working',
    description: 'Không gian làm việc tuyệt vời, nơi thường diễn ra các buổi meetup AI và công nghệ.',
    longitude: 106.7046, // Tọa độ mẫu
    latitude: 10.7766,
    // Ảnh thumbnail nhỏ cho Marker (dùng link thực tế hoặc file tĩnh trong thư mục public)
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=150&h=150&fit=crop&q=80',
    // Ảnh lớn hiển thị trong Drawer
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop&q=80'
  },
  {
    id: 'spot-2',
    name: 'Quán Coffee Fix Bug',
    type: 'Quán Cà phê',
    description: 'Chạy deadline và code xuyên đêm với wifi cực mạnh.',
    longitude: 106.6821,
    latitude: 10.7626,
    thumbnail: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=150&h=150&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=400&fit=crop&q=80'
  }
]

export default function MapSection() {
  const [viewState, setViewState] = useState({
    longitude: 106.7009,
    latitude: 10.7769,
    zoom: 12,
    pitch: 0
  })

  // State quản lý Drawer. Mặc định là null (Drawer đóng)
  const [selectedSpot, setSelectedSpot] = useState<(typeof FAVORITE_SPOTS)[0] | null>(null)

  return (
    <div className='relative w-full font-sans'>
      <div className='h-[500px] w-full overflow-hidden rounded-2xl border border-gray-200 shadow-lg'>
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle={`https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`}
          maxBounds={HCMC_BOUNDS}
          minZoom={10}
        >
          <NavigationControl position='top-right' />

          {/* Render Marker là các Avatar */}
          {FAVORITE_SPOTS.map((spot) => (
            <Marker
              key={spot.id}
              longitude={spot.longitude}
              latitude={spot.latitude}
              anchor='center' // Đặt tâm ảnh vào đúng tọa độ
              onClick={(e) => {
                e.originalEvent.stopPropagation()
                setSelectedSpot(spot) // Click vào Marker -> set State -> Mở Drawer
              }}
            >
              <div className='group relative cursor-pointer transition-transform duration-300 hover:z-50 hover:scale-110'>
                {/* Viền ngoài và hình đại diện */}
                <div className='h-12 w-12 overflow-hidden rounded-full border-[3px] border-white bg-gray-100 shadow-lg'>
                  {/* Dùng Next/Image tối ưu hình ảnh */}
                  <Image
                    src={spot.thumbnail}
                    alt={spot.name}
                    width={48}
                    height={48}
                    className='h-full w-full object-cover'
                  />
                </div>
                {/* Mũi tên trỏ xuống tạo hình giọt nước */}
                <div className='absolute -bottom-1 left-1/2 -z-10 h-3 w-3 -translate-x-1/2 rotate-45 bg-white shadow-sm'></div>
              </div>
            </Marker>
          ))}
        </Map>
      </div>

      <Drawer
        direction='right'
        open={!!selectedSpot}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelectedSpot(null)
        }}
      >
        <DrawerContent className='z-50 mt-0 flex h-full w-full max-w-sm flex-col rounded-l-2xl rounded-t-none border-l border-gray-200 bg-white p-0 shadow-xl'>
          {selectedSpot && (
            <div className='flex h-full w-full flex-col justify-between'>
              <div>
                {/* Bo góc ảnh cover cho khớp với góc trái của Drawer */}
                <div className='relative h-48 w-full overflow-hidden rounded-tl-2xl'>
                  <Image src={selectedSpot.coverImage} alt={selectedSpot.name} fill className='object-cover' />
                </div>

                <DrawerHeader className='px-6 pt-6'>
                  <DrawerTitle className='text-2xl font-bold text-gray-900'>{selectedSpot.name}</DrawerTitle>
                  <span className='mt-2 inline-block w-max rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600'>
                    {selectedSpot.type}
                  </span>
                  <DrawerDescription className='mt-4 text-base leading-relaxed text-gray-700'>
                    {selectedSpot.description}
                  </DrawerDescription>
                </DrawerHeader>
              </div>

              <DrawerFooter className='border-t border-gray-100 p-6'>
                <DrawerClose asChild>
                  <button className='w-full rounded-xl bg-gray-900 py-3 font-medium text-white transition-colors hover:bg-gray-800'>
                    Đóng
                  </button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  )
}
