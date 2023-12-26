// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod utils;
mod models;

use models::Order;
use tauri::Manager;
use utils::{get_data, write_data, filter_orders_by_year};
use tauri::{
    CustomMenuItem,
    SystemTray,
    SystemTrayMenu,
    SystemTrayMenuItem,
    SystemTrayEvent
};

#[tauri::command]
fn add_order(order: String) {
    let order_data = serde_json::from_str(&order).unwrap();
    let mut data = get_data();
    data.push(order_data);

    write_data(data);
}

#[tauri::command]
fn get_orders(year: i32) -> String {
    let orders = get_data();
    let filtered_orders: Vec<Order> = filter_orders_by_year(&orders, year);

    serde_json::to_string(&filtered_orders).unwrap()
}

#[tauri::command]
fn remove_order(order_id: String) {
    let mut data = get_data();
    if let Some(index) = data.iter().position(|order| order.id == order_id) {
        data.remove(index);
    }

    write_data(data);
}

#[tauri::command]
fn change_order(order_id: String, updated_order: String) {
    let new_order: Order = serde_json::from_str(&updated_order).unwrap();
    let mut data = get_data();
    if let Some(order) = data.iter_mut().find(|obj| obj.id == order_id) {
        order.id = new_order.id;
        order.color = new_order.color;
        order.customer = new_order.customer;
        order.set = new_order.set;
        order.deadline = new_order.deadline;
        order.comment = new_order.comment;
        order.done = new_order.done;
        order.ready = new_order.ready;
        order.details = new_order.details;
    }

    write_data(data);
}

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
        .invoke_handler(tauri::generate_handler![add_order, get_orders, remove_order, change_order])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
