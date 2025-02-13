import tkinter as tk
from tkinter import filedialog, messagebox, ttk
import yt_dlp as youtube_dl
import os
import threading
import re

def clean_ansi_escapes(text):
    ansi_escape = re.compile(r'\x1B[@-_][0-?]*[ -/]*[@-~]')
    return ansi_escape.sub('', text)

def download_videos():
    url = url_entry.get()
    save_path = path_entry.get()
    include_audio = audio_checkbox_var.get()

    if not url or not save_path:
        messagebox.showerror("Error", "Por favor, proporciona una URL y una ruta de guardado.")
        return

    ydl_opts = {
        'outtmpl': os.path.join(save_path, '%(title)s.%(ext)s'),
        'progress_hooks': [progress_hook]
    }

    if include_audio:
        ydl_opts['format'] = 'bestvideo+bestaudio[ext=mp4]/best[ext=mp4]'
        ydl_opts['postprocessors'] = [{
            'key': 'FFmpegVideoConvertor',
            'preferedformat': 'mp4',
        }]
    else:
        ydl_opts['format'] = 'bestvideo[height<=720][vcodec!=none]'

    try:
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        messagebox.showinfo("Éxito", "Descarga completada.")
    except Exception as e:
        error_message = f"Error al descargar: {str(e)}"
        print(error_message)
        messagebox.showerror("Error", error_message)

def download_music():
    url = url_entry.get()
    save_path = path_entry.get()

    if not url or not save_path:
        messagebox.showerror("Error", "Por favor, proporciona una URL y una ruta de guardado.")
        return

    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [
            {
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            },
            {
                'key': 'EmbedThumbnail',
            },
        ],
        'outtmpl': os.path.join(save_path, '%(title)s.%(ext)s'),
        'writethumbnail': True,
        'progress_hooks': [progress_hook]
    }

    try:
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        messagebox.showinfo("Éxito", "Descarga completada.")
    except Exception as e:
        error_message = f"Error al descargar: {str(e)}"
        print(error_message)
        messagebox.showerror("Error", error_message)

def progress_hook(d):
    if d['status'] == 'downloading':
        percent = d['_percent_str']
        percent = clean_ansi_escapes(percent)
        percent = float(percent.strip('%'))
        progress_bar['value'] = percent
        progress_label.config(text=f"Descargando: {d.get('filename', 'archivo')}")
        root.update_idletasks()
    elif d['status'] == 'finished':
        progress_bar['value'] = 100
        root.update_idletasks()

def start_download_video():
    download_thread = threading.Thread(target=download_videos)
    download_thread.start()

def start_download_music():
    download_thread = threading.Thread(target=download_music)
    download_thread.start()

def select_path():
    path = filedialog.askdirectory()
    if path:
        path_entry.config(state=tk.NORMAL)
        path_entry.delete(0, tk.END)
        path_entry.insert(0, path)
        path_entry.config(state=tk.DISABLED)

def show_message():
    messagebox.showinfo("Información", "Aún no disponible")

def switch_to_video():
    download_button.config(text="Descargar Video", command=start_download_video, bg="red")
    url_label.config(text="URL del Video o Playlist:")
    progress_label.config(text="")
    audio_checkbox.grid(row=1, column=1, sticky="w")
    root.title("Descargador de Videos de YouTube")

def switch_to_music():
    download_button.config(text="Descargar Música", command=start_download_music, bg="blue")
    url_label.config(text="URL de la Música (YouTube/Spotify):")
    progress_label.config(text="")
    audio_checkbox.grid_forget()
    root.title("Descargador de Música")

# Configurar la ventana principal
root = tk.Tk()
root.title("Descargador de Videos de YouTube")
root.geometry("400x400")

# Barra de menú
menu_bar = tk.Menu(root)
root.config(menu=menu_bar)

options_menu = tk.Menu(menu_bar, tearoff=0)
menu_bar.add_cascade(label="Opciones", menu=options_menu)
options_menu.add_command(label="Video", command=switch_to_video)
options_menu.add_command(label="Música", command=switch_to_music)
options_menu.add_command(label="Other", command=show_message)

# Campo para ingresar la URL
url_label = tk.Label(root, text="URL del Video o Playlist:")
url_label.pack(pady=5)
url_entry = tk.Entry(root, width=50)
url_entry.pack(pady=5)


audio_checkbox_var = tk.BooleanVar()
audio_checkbox = tk.Checkbutton(root, text="¿Sonido?", variable=audio_checkbox_var)
audio_checkbox.pack(pady=5)


# Botón para seleccionar la ruta de guardado
tk.Label(root, text="Ruta de Guardado:").pack(pady=5)
path_entry = tk.Entry(root, width=50, state=tk.DISABLED)
path_entry.pack(pady=5)
tk.Button(root, text="Seleccionar Ruta", command=select_path).pack(pady=5)

# Barra de progreso
progress_label = tk.Label(root, text="")
progress_label.pack(pady=5)
progress_bar = ttk.Progressbar(root, orient="horizontal", length=300, mode="determinate")
progress_bar.pack(pady=10)

# Botón rojo para descargar
download_button = tk.Button(root, text="Descargar Video", command=start_download_video, bg="red", fg="white", font=("Arial", 12, "bold"))
download_button.pack(pady=20)

# Ejecutar la aplicación
root.mainloop()
