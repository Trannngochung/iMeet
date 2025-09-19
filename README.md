# Meeting
Đặt lịch hẹn
## 🚀 Cách chạy các script Database

1. Đảm bảo bạn đã cài MySQL (local hoặc Docker).  
2. Kết nối vào MySQL bằng user `root` (hoặc user khác nếu bạn có).  
3. Chạy lần lượt các lệnh sau để tạo database, bảng và dữ liệu mẫu:

```bash
# Tạo database và các bảng
mysql -u root -p < BE/db/schema.sql

# Import dữ liệu mẫu
mysql -u root -p meeting_scheduler < BE/db/data.sql
