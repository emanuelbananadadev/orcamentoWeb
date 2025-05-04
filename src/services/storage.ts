import { LocalStorageService } from './localStorage'
import type { IStorageService } from '../interfaces/storage'

// Aqui podemos facilmente trocar a implementação do serviço de armazenamento
// quando decidirmos migrar para o Supabase
export const storageService: IStorageService = new LocalStorageService()
