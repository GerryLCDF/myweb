import os
import tkinter as tk
from tkinter import filedialog, messagebox
from spleeter.separator import Separator

def select_audio_file():
    """Abre un cuadro de diálogo para seleccionar un archivo de audio."""
    file_path = filedialog.askopenfilename(
        filetypes=[("Audio Files", "*.mp3 *.wav *.flac")],
        title="Selecciona una canción"
    )
    if file_path:
        return file_path
    else:
        messagebox.showwarning("Archivo no seleccionado", "No se seleccionó ningún archivo.")
        return None

def select_output_directory():
    """Abre un cuadro de diálogo para seleccionar un directorio de salida."""
    directory = filedialog.askdirectory(title="Selecciona un directorio de salida")
    if directory:
        return directory
    else:
        messagebox.showwarning("Directorio no seleccionado", "No se seleccionó ningún directorio.")
        return None

def separate_tracks(audio_path, output_dir):
    """Usa Spleeter para separar las pistas de audio."""
    try:
        print("Separando las pistas...")
        separator = Separator('spleeter:2stems')  # Configuración para voz y música
        separator.separate_to_file(audio_path, output_dir)
        messagebox.showinfo("Éxito", f"Pistas separadas y guardadas en: {os.path.abspath(output_dir)}")
    except Exception as e:
        messagebox.showerror("Error", f"Error durante la separación: {e}")

if __name__ == "__main__":
    # Crear la ventana raíz de Tkinter
    root = tk.Tk()
    root.withdraw()  # Ocultar la ventana principal de Tkinter

    # Seleccionar el archivo de audio
    messagebox.showinfo("Seleccionar canción", "Por favor, selecciona una canción.")
    audio_file = select_audio_file()

    if audio_file:
        # Seleccionar el directorio de salida
        messagebox.showinfo("Seleccionar directorio", "Por favor, selecciona un directorio de salida.")
        output_directory = select_output_directory()

        if output_directory:
            # Separar las pistas
            separate_tracks(audio_file, output_directory)
        else:
            print("Operación cancelada. No se seleccionó un directorio de salida.")
    else:
        print("Operación cancelada. No se seleccionó un archivo de audio.")
