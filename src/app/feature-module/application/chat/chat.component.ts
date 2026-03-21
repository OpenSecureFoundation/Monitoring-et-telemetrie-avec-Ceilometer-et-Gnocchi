import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    standalone: false
})
export class ChatComponent implements AfterViewInit {
  constructor() {}
  @ViewChild('replyTextarea') replyTextarea!: ElementRef<HTMLTextAreaElement>;
  public chatSlide = false;
  message: string = '';
  // selectedFile: File | null = null;
  // Remplacer selectedFile par :
  selectedFiles: File[] = [];

  ngAfterViewInit() {
    // Si vous voulez qu'il s'ajuste aussi à un texte pré-rempli :
    this.adjustTextareaHeight();
  }
  onTextareaInput(): void {
    this.adjustTextareaHeight();
  }

  private adjustTextareaHeight(): void {
    const ta = this.replyTextarea.nativeElement;
    ta.style.height = 'auto'; // remet à une hauteur de base
    ta.style.height = ta.scrollHeight + 'px'; // ajuste à son contenu
  }

  showChatSlide() {
    this.chatSlide = !this.chatSlide;
  }

  sendMessage() {
    if (this.selectedFiles.length > 0 && this.message.trim()) {
      // Envoyer les fichiers + message
      console.log('Fichiers envoyés:', this.selectedFiles);
      console.log('Message:', this.message);

      // Réinitialiser APRÈS envoi
      this.selectedFiles = [];
      this.message = '';
      this.resetFileInput();
    } else if (this.message.trim()) {
      // Envoyer juste le message
      console.log('Message:', this.message);
      // Réinitialiser APRÈS envoi
      this.message = '';
    } else if (this.selectedFiles.length > 0) {
      // Envoyer juste les fichiers
      console.log('Fichiers envoyés:', this.selectedFiles);
      // Réinitialiser APRÈS envoi
      this.selectedFiles = [];
      this.resetFileInput();
    }
  }

  // Nouvelle méthode pour réinitialiser l'input
  resetFileInput() {
    const fileInput = document.getElementById(
      'fichier-perso',
    ) as HTMLInputElement;
    fileInput.value = ''; // Nécessaire pour Chrome/Firefox
    fileInput.type = 'text'; // Astuce pour Edge/IE
    fileInput.type = 'file';
  }

  // Modifier onFileSelected
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const newFiles = Array.from(input.files).slice(
        0,
        3 - this.selectedFiles.length,
      );
      this.selectedFiles = [...this.selectedFiles, ...newFiles];
      console.log('selected files: ', this.selectedFiles);
    }
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    // Réinitialisation de l'input
    const fileInput = document.getElementById(
      'fichier-perso',
    ) as HTMLInputElement;
    fileInput.value = ''; // <-- Ceci force le reset

    // // Réinitialisation sécurisée de l'input
    // const fileInput = document.getElementById(
    //   'fichier-perso',
    // ) as HTMLInputElement;
    // fileInput.type = 'text'; // Trick pour réinitialiser sans perdre les autres fichiers
    // fileInput.type = 'file';
  }

  getFileIcon(file: File): string {
    const ext = file.name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return 'fa-file-pdf';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return 'fa-file-image';
      case 'doc':
      case 'docx':
        return 'fa-file-word';
      default:
        return 'fa-file-alt';
    }
  }

  getFileExtension(filename: string): string {
    const extension = filename.split('.').pop()?.toUpperCase() || 'FILE';
    return extension.length > 5 ? extension.slice(0, 5) + '…' : extension;
  }

  // Ajoutez cette méthode pour formater la taille
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const units = ['Bytes', 'KB', 'MB', 'GB'];
    const decimals = 1;
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + units[i]
    );
  }
}
