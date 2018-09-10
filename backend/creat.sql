CREATE DATABASE IF NOT EXISTS RSBA;

USE RSBA;

CREATE TABLE IF NOT EXISTS activity(
	`id`             INT AUTO_INCREMENT PRIMARY KEY        COMMENT '活动ID',
    `type`           TINYINT UNSIGNED  NOT NULL DEFAULT 0  COMMENT '活动类型，0志愿，1福利',
    `title`          VARCHAR(255)      NOT NULL DEFAULT '' COMMENT '活动标题',
    `publisher`      VARCHAR(255)      NOT NULL DEFAULT '' COMMENT '活动发起人',
    `details`        VARCHAR(255)      NOT NULL DEFAULT '' COMMENT '活动详情',
    `time`           DATETIME          NOT NULL            COMMENT '开始时间',
    `award`          SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '奖品数',
    `member`         SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '限制人数',
    `current_member` SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '报名人数',
    `created_at`     DATETIME          NOT NULL            COMMENT '创建时间',
    `updated_at`     DATETIME          NOT NULL            COMMENT '修改时间'
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='活动表';

CREATE TABLE IF NOT EXISTS user(
	`id`             INT AUTO_INCREMENT PRIMARY KEY,
    `stuno`          VARCHAR(20)       NOT NULL DEFAULT '0'    COMMENT '学号',
    `name`           VARCHAR(20)       NOT NULL DEFAULT ''     COMMENT '用户',
    `department`     TINYINT UNSIGNED  NOT NULL DEFAULT 0      COMMENT '所属部门',
    `grp`            VARCHAR(20)       NOT NULL DEFAULT '干事' COMMENT '组别',
    `tele`           VARCHAR(20)       NOT NULL DEFAULT '0'    COMMENT '电话',
    `created_at`     DATETIME          NOT NULL                COMMENT '创建时间',
    `updated_at`     DATETIME          NOT NULL                COMMENT '修改时间'
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

CREATE TABLE IF NOT EXISTS activity_user(
	`id`             INT AUTO_INCREMENT PRIMARY KEY,
    `activity_id`    INT UNSIGNED      NOT NULL DEFAULT 0  COMMENT '活动id',
    `user_id`        INT UNSIGNED      NOT NULL DEFAULT 0  COMMENT '用户id',  
    `created_at`     DATETIME          NOT NULL                COMMENT '创建时间',
    `updated_at`     DATETIME          NOT NULL                COMMENT '修改时间'
)ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT='活动用户报名中间表';

CREATE TABLE IF NOT EXISTS member_list(
	`id`             INT AUTO_INCREMENT PRIMARY KEY        COMMENT '活动ID',
    `dep0`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '编辑部',
    `dep1`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '综合管理部',
    `dep2`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '综合新闻部',
    `dep3`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '外联部',
    `dep4`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '策划推广部',
    `dep5`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '节目部',
    `dep6`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '人力资源部',
    `dep7`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '技术部',
    `dep8`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '视频部',
    `dep9`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '视觉设计部',
    `created_at`     DATETIME          NOT NULL            COMMENT '创建时间',
    `updated_at`     DATETIME          NOT NULL            COMMENT '修改时间'
)ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT='部门限制人数表';

CREATE TABLE IF NOT EXISTS current_member_list(
	`id`             INT AUTO_INCREMENT PRIMARY KEY        COMMENT '活动ID',
    `dep0`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '编辑部',
    `dep1`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '综合管理部',
    `dep2`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '综合新闻部',
    `dep3`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '外联部',
    `dep4`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '策划推广部',
    `dep5`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '节目部',
    `dep6`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '人力资源部',
    `dep7`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '技术部',
    `dep8`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '视频部',
    `dep9`           SMALLINT UNSIGNED NOT NULL DEFAULT 0  COMMENT '视觉设计部',
    `created_at`     DATETIME          NOT NULL            COMMENT '创建时间',
    `updated_at`     DATETIME          NOT NULL            COMMENT '修改时间'
)ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT='部门报名人数表';

CREATE TABLE IF NOT EXISTS image(
    `id`             INT AUTO_INCREMENT PRIMARY KEY,
    `activity_id`    INT UNSIGNED      NOT NULL DEFAULT 0  COMMENT '活动id',
    `img_name`       VARCHAR(20)       NOT NULL DEFAULT '0'COMMENT '活动图片名',  
    `created_at`     DATETIME          NOT NULL            COMMENT '创建时间',
    `updated_at`     DATETIME          NOT NULL            COMMENT '修改时间'
)ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT='活动图片表';