import { AdminModule, PermissionMatrix, RoleSlug } from '../types'

export const SYSTEM_ROLE_PERMISSIONS: Record<RoleSlug, PermissionMatrix> = {
  super_admin: {
    overview: { can_view: true, can_create: true, can_edit: true, can_delete: true },
    appointments: { can_view: true, can_create: true, can_edit: true, can_delete: true },
    doctors: { can_view: true, can_create: true, can_edit: true, can_delete: true },
    availability: { can_view: true, can_create: true, can_edit: true, can_delete: true },
    'blood-bank': { can_view: true, can_create: true, can_edit: true, can_delete: true },
    enquiries: { can_view: true, can_create: true, can_edit: true, can_delete: true },
    settings: { can_view: true, can_create: true, can_edit: true, can_delete: true },
  },
  appointment_staff: {
    overview: { can_view: true, can_create: false, can_edit: false, can_delete: false },
    appointments: { can_view: true, can_create: true, can_edit: true, can_delete: true },
    doctors: { can_view: true, can_create: false, can_edit: false, can_delete: false },
    availability: { can_view: true, can_create: false, can_edit: false, can_delete: false },
    'blood-bank': { can_view: false, can_create: false, can_edit: false, can_delete: false },
    enquiries: { can_view: false, can_create: false, can_edit: false, can_delete: false },
    settings: { can_view: false, can_create: false, can_edit: false, can_delete: false },
  },
  doctor_manager: {
    overview: { can_view: true, can_create: false, can_edit: false, can_delete: false },
    appointments: { can_view: true, can_create: false, can_edit: false, can_delete: false },
    doctors: { can_view: true, can_create: true, can_edit: true, can_delete: true },
    availability: { can_view: true, can_create: true, can_edit: true, can_delete: true },
    'blood-bank': { can_view: false, can_create: false, can_edit: false, can_delete: false },
    enquiries: { can_view: false, can_create: false, can_edit: false, can_delete: false },
    settings: { can_view: false, can_create: false, can_edit: false, can_delete: false },
  },
  blood_bank_staff: {
    overview: { can_view: true, can_create: false, can_edit: false, can_delete: false },
    appointments: { can_view: false, can_create: false, can_edit: false, can_delete: false },
    doctors: { can_view: false, can_create: false, can_edit: false, can_delete: false },
    availability: { can_view: false, can_create: false, can_edit: false, can_delete: false },
    'blood-bank': { can_view: true, can_create: true, can_edit: true, can_delete: true },
    enquiries: { can_view: false, can_create: false, can_edit: false, can_delete: false },
    settings: { can_view: false, can_create: false, can_edit: false, can_delete: false },
  },
  enquiries_staff: {
    overview: { can_view: true, can_create: false, can_edit: false, can_delete: false },
    appointments: { can_view: false, can_create: false, can_edit: false, can_delete: false },
    doctors: { can_view: false, can_create: false, can_edit: false, can_delete: false },
    availability: { can_view: false, can_create: false, can_edit: false, can_delete: false },
    'blood-bank': { can_view: false, can_create: false, can_edit: false, can_delete: false },
    enquiries: { can_view: true, can_create: false, can_edit: true, can_delete: false },
    settings: { can_view: false, can_create: false, can_edit: false, can_delete: false },
  },
}

export function getRolePermissions(role: RoleSlug): PermissionMatrix {
  if (typeof window !== 'undefined') {
    const customMatrix = localStorage.getItem('clinicacure_admin_roles_matrix')
    if (customMatrix) {
      try {
        const parsed = JSON.parse(customMatrix)
        if (parsed[role]) return parsed[role]
      } catch {}
    }
  }
  return SYSTEM_ROLE_PERMISSIONS[role] || SYSTEM_ROLE_PERMISSIONS.appointment_staff
}

export function saveRolePermissions(role: RoleSlug, matrix: PermissionMatrix): void {
  if (typeof window !== 'undefined') {
    let allMatrix: Record<string, PermissionMatrix> = { ...SYSTEM_ROLE_PERMISSIONS }
    const customMatrix = localStorage.getItem('clinicacure_admin_roles_matrix')
    if (customMatrix) {
      try {
        allMatrix = { ...allMatrix, ...JSON.parse(customMatrix) }
      } catch {}
    }
    allMatrix[role] = matrix
    localStorage.setItem('clinicacure_admin_roles_matrix', JSON.stringify(allMatrix))
  }
}

export function hasPermission(
  role: string | undefined,
  module: AdminModule,
  action: 'view' | 'create' | 'edit' | 'delete' = 'view',
  userPermissions?: Partial<PermissionMatrix>
): boolean {
  if (!role) return false

  // 1. Check user-specific custom permission overrides if set
  if (userPermissions && userPermissions[module]) {
    const customPerm = userPermissions[module]
    if (customPerm) {
      switch (action) {
        case 'view':
          return Boolean(customPerm.can_view)
        case 'create':
          return Boolean(customPerm.can_create)
        case 'edit':
          return Boolean(customPerm.can_edit)
        case 'delete':
          return Boolean(customPerm.can_delete)
        default:
          return false
      }
    }
  }

  // 2. Check Role-based permissions
  const normalizedRole: RoleSlug =
    role === 'admin' ? 'super_admin' : role === 'receptionist' ? 'appointment_staff' : (role as RoleSlug)

  const matrix = getRolePermissions(normalizedRole)
  if (!matrix) return false

  const modulePerm = matrix[module]
  if (!modulePerm) return false

  switch (action) {
    case 'view':
      return modulePerm.can_view
    case 'create':
      return modulePerm.can_create
    case 'edit':
      return modulePerm.can_edit
    case 'delete':
      return modulePerm.can_delete
    default:
      return false
  }
}
