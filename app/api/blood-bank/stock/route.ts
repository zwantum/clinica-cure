import { NextResponse } from 'next/server'
import { BloodStockRecord } from '@/app/admin/types'

const DEFAULT_STOCK: BloodStockRecord[] = [
  { blood_group: 'A+', component_type: 'Whole Blood', available_units: 14, min_threshold: 5, last_updated_at: new Date().toISOString(), status: 'adequate' },
  { blood_group: 'A-', component_type: 'Whole Blood', available_units: 4, min_threshold: 3, last_updated_at: new Date().toISOString(), status: 'moderate' },
  { blood_group: 'B+', component_type: 'Whole Blood', available_units: 22, min_threshold: 6, last_updated_at: new Date().toISOString(), status: 'adequate' },
  { blood_group: 'B-', component_type: 'Whole Blood', available_units: 6, min_threshold: 3, last_updated_at: new Date().toISOString(), status: 'adequate' },
  { blood_group: 'AB+', component_type: 'Whole Blood', available_units: 9, min_threshold: 4, last_updated_at: new Date().toISOString(), status: 'adequate' },
  { blood_group: 'AB-', component_type: 'Whole Blood', available_units: 2, min_threshold: 3, last_updated_at: new Date().toISOString(), status: 'critical' },
  { blood_group: 'O+', component_type: 'Whole Blood', available_units: 31, min_threshold: 8, last_updated_at: new Date().toISOString(), status: 'adequate' },
  { blood_group: 'O-', component_type: 'Whole Blood', available_units: 3, min_threshold: 4, last_updated_at: new Date().toISOString(), status: 'critical' },
  { blood_group: 'BOMBAY (HH)', component_type: 'Whole Blood', available_units: 1, min_threshold: 2, last_updated_at: new Date().toISOString(), status: 'critical' },
]

// Server in-memory store so changes persist across requests
const inMemoryStock: BloodStockRecord[] = [...DEFAULT_STOCK]

function calculateStatus(units: number, threshold: number): 'adequate' | 'moderate' | 'critical' {
  if (units <= threshold / 2) return 'critical'
  if (units <= threshold) return 'moderate'
  return 'adequate'
}

export async function GET() {
  return NextResponse.json({
    success: true,
    stock: inMemoryStock,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { blood_group, component_type, available_units, min_threshold } = body

    if (!blood_group) {
      return NextResponse.json({ success: false, error: 'Blood group is required' }, { status: 400 })
    }

    const units = Number(available_units) >= 0 ? Number(available_units) : 0
    const threshold = Number(min_threshold) > 0 ? Number(min_threshold) : 3
    const compType = (component_type || 'Whole Blood').trim()
    const cleanGroup = blood_group.trim().toUpperCase()

    const existingIndex = inMemoryStock.findIndex(
      (item) => item.blood_group === cleanGroup && item.component_type === compType
    )

    const status = calculateStatus(units, threshold)

    if (existingIndex >= 0) {
      inMemoryStock[existingIndex] = {
        ...inMemoryStock[existingIndex],
        available_units: units,
        min_threshold: threshold,
        status,
        last_updated_at: new Date().toISOString(),
      }
      return NextResponse.json({
        success: true,
        message: `Updated stock for ${cleanGroup} (${compType})`,
        item: inMemoryStock[existingIndex],
        stock: inMemoryStock,
      })
    }

    const newRecord: BloodStockRecord = {
      blood_group: cleanGroup,
      component_type: compType,
      available_units: units,
      min_threshold: threshold,
      status,
      last_updated_at: new Date().toISOString(),
    }

    inMemoryStock.push(newRecord)

    return NextResponse.json({
      success: true,
      message: `Added new blood group ${cleanGroup} (${compType})`,
      item: newRecord,
      stock: inMemoryStock,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid request'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { blood_group, component_type, delta, units, min_threshold } = body

    if (!blood_group) {
      return NextResponse.json({ success: false, error: 'Blood group is required' }, { status: 400 })
    }

    const compType = component_type || 'Whole Blood'
    const index = inMemoryStock.findIndex(
      (item) =>
        item.blood_group.toUpperCase() === blood_group.trim().toUpperCase() &&
        (!component_type || item.component_type === compType)
    )

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Blood stock item not found' }, { status: 404 })
    }

    const currentItem = inMemoryStock[index]
    let newUnits = currentItem.available_units
    if (typeof delta === 'number') {
      newUnits = Math.max(0, newUnits + delta)
    } else if (typeof units === 'number') {
      newUnits = Math.max(0, units)
    }

    const threshold = typeof min_threshold === 'number' ? min_threshold : currentItem.min_threshold
    const status = calculateStatus(newUnits, threshold)

    inMemoryStock[index] = {
      ...currentItem,
      available_units: newUnits,
      min_threshold: threshold,
      status,
      last_updated_at: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      item: inMemoryStock[index],
      stock: inMemoryStock,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid request'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
