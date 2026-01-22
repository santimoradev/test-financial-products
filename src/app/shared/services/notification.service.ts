import { computed, Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class NotificationService {
  message = signal<string>('')

  hasMessage = computed( () => this.message() !== '')

  setGlobalError() {
    this.message.set('Ha ocurrido un error');
  }
  setMessage( messageTxt: string) {
    this.message.set( messageTxt)
  }
  clearMessage() {
    this.message.set('')
  }

}
