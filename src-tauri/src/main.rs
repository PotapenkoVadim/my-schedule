// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
  CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem
};

fn main() {
  let new_order = CustomMenuItem::new("new_order".to_string(), "Создать заказ");
  let switch_theme = CustomMenuItem::new("switch_theme".to_string(), "Переключить тему");
  let quit = CustomMenuItem::new("quit".to_string(), "Выход");
  let hide = CustomMenuItem::new("hide".to_string(), "Свернуть");
  let show = CustomMenuItem::new("show".to_string(), "Показать");

  let tray_menu = SystemTrayMenu::new()
      .add_item(new_order)
      .add_item(switch_theme)
      .add_native_item(SystemTrayMenuItem::Separator)
      .add_item(show)
      .add_item(hide)
      .add_item(quit);

  let tray = SystemTray::new().with_menu(tray_menu);

  tauri::Builder::default()
    .system_tray(tray)
    .on_system_tray_event(|app, event| match event {
      SystemTrayEvent::LeftClick {
          position: _,
          size: _,
          ..
        } => {
          let window = app.get_window("main").unwrap();

          window.set_focus().unwrap();
        },
      SystemTrayEvent::MenuItemClick { id, .. } => {
          let window = app.get_window("main").unwrap();

          match id.as_str() {
            "quit" => std::process::exit(0),
            "hide" => window.hide().unwrap(),
            "show" => {
              window.show().unwrap();
              window.set_focus().unwrap();
            },
            "new_order" => {
              window.set_focus().unwrap();
              window.emit("new_order", {}).unwrap()
            },
            "switch_theme" => {
              window.set_focus().unwrap();
              window.emit("switch_theme", {}).unwrap()
            },
            _ => {}
          }
        }
        _ => {}
      }
    )
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
