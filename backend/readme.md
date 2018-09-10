# Registration-System-for-BBT-Activity's Backstage
## RSBA-Backstage 百步梯活动报名系统-后台
### 食用指南
- 食用前先将`/.env`的数据库和`/config/RSBA-Validate.php`配置好
- 在你的数据库上运行`/creat.sql`
- 主目录下运行`composer install` 和 `php artisan key:generate` *有关`composer`与镜像的内容，请参考https://laravel-china.org/composer* 
- 前端请求链接配置为*后台存放环境/后台文件夹名/public/接口路由* 
    - 栗子：`url='localhost/RSBA-Backstage/public/api/login'`
- 默认预览图片放置在`/storage/app/RSBA-img/`下，请将默认图片命名为`0` *无需后缀名*
- 一切配置完就可以跑起来了😂
-------
#### Code By KanoLin. Power By Laravel5.6. 2018.