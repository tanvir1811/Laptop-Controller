#!/usr/bin/env python3

import tkinter as tk
import subprocess
import socket
import os

server_process = None

def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
    except:
        ip = "Not connected"
    finally:
        s.close()
    return ip

def copy_to_clipboard(text):
    app.clipboard_clear()
    app.clipboard_append(text)

def start_server():
    global server_process
    if server_process is None:
      base = os.path.dirname(__file__)
      server_js = os.path.join(base, "Server", "Server.js")
      server_process = subprocess.Popen(["node", server_js])
    status_label.config(text="Server: Running")

def stop_server():
    global server_process
    if server_process:
        server_process.terminate()
        server_process = None
        status_label.config(text="Server: Stopped")

def on_closing():
  stop_server()  # stop server if running
  app.destroy() 

app = tk.Tk()
app.geometry("400x300")
app.title("Laptop Controller")


url1=f"{get_ip()}:3000"
ip_label = tk.Label(app, text=f"IP Address:{get_ip()}:3000", font=("Arial", 12))
ip_label.pack(pady=10)

status_label = tk.Label(app, text="Server: Stopped", font=("Arial", 12))
status_label.pack(pady=10)

copy_btn = tk.Button(app, text="Copy", command=lambda: copy_to_clipboard(url1))
copy_btn.pack(pady=5)

start_btn = tk.Button(app, text="Start Server", command=start_server)
start_btn.pack(pady=10)

stop_btn = tk.Button(app, text="Stop Server", command=stop_server)
stop_btn.pack(pady=10)
app.protocol("WM_DELETE_WINDOW", on_closing)

app.mainloop()
