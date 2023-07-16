use chrono::{DateTime, Duration, Utc, Datelike};
use std::str::FromStr;
use std::{fs::{self, File}, path::Path, io::Read};
use serde_json::to_writer;

use crate::models::Order;

const DATA_DIR: &str = "d:\\bin\\my-shedule\\"; 
const DATA_FILE: &str = "data.json";

pub fn write_data(data: Vec<Order>) {
  fs::create_dir_all(DATA_DIR).unwrap();

  let file = File::create(DATA_DIR.to_owned() + &DATA_FILE.to_owned()).unwrap();
  to_writer(file, &data).unwrap();
}

pub fn get_data() -> Vec<Order> {
  let mut data: Vec<Order> = Vec::new();

  let path_str = DATA_DIR.to_owned() + &DATA_FILE.to_owned();
  let path = Path::new(&path_str);
  if !path.exists() {
      return data;
  }

  let mut file = File::open(path).unwrap();
  let mut content = String::new();
  file.read_to_string(&mut content).unwrap();

  data = match serde_json::from_str(&content) {
      Ok(data) => data,
      Err(_) => Vec::new()
  };

  data
}

pub fn filter_orders_by_year(orders: &Vec<Order>, year: i32) -> Vec<Order> {
  orders.iter()
      .filter(|order| {
          if let Some(deadline) = order.deadline.get(0) {
              if let Ok(datetime) = DateTime::<Utc>::from_str(deadline) {
                  let day = datetime.checked_add_signed(Duration::days(1)).unwrap();

                  return day.year() == year;
              }
          }

          false
      })
      .cloned()
      .collect()
}