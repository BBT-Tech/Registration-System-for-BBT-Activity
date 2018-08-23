# 前后端对接文档
### 总体说明
- 部门代码映射表：
    ```json
    {
        "0": "编辑部",
        "1": "综合管理部",
        "2": "综合新闻部",
        "3": "外联部",
        "4": "策划推广部",
        "5": "节目部",
        "6": "人力资源部",
        "7": "技术部",
        "8": "视频部",
        "9": "视觉设计部"
    }
    ```
### 打开页面时身份验证
- 路由：`/api/init`
- 请求方法：`POST`
- 返回参数：
    - 示例
        ```json
        {
            "err_code": 0,
            "err_msg": "",
            "data": {
                "logined": true,
                "student_id": "201720182019",
                "name": "张三",
                "is_manager": false
            }
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>err_code</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>err_msg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
                <tr>
                    <td>logined</td>
                    <td>bool</td>
                    <td>用户之前是否已登录。</td>
                </tr>
                <tr>
                    <td>student_id</td>
                    <td>string</td>
                    <td>学号。</td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>string</td>
                    <td>姓名。</td>
                </tr>
                <tr>
                    <td>is_manager</td>
                    <td>bool</td>
                    <td>是否为管理员。</td>
                </tr>
            </tbody>
        </table>
### 登录认证
- 路由：`/api/login`
- 请求方法：`POST`
- 请求参数：
    - 示例：
        ```json
        {
            "student_id": "201720182019",
            "password": "***********"
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>student_id</td>
                    <td>string</td>
                    <td>学号。</td>
                </tr>
                <tr>
                    <td>password</td>
                    <td>string</td>
                    <td>密码。</td>
                </tr>
            </tbody>
        </table>
- 返回参数：
    - 示例
        ```json
        {
            "err_code": 0,
            "err_msg": "",
            "data": {
                "name": "张三",
                "is_manager": false
            }
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>err_code</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>err_msg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>string</td>
                    <td>姓名。</td>
                </tr>
                <tr>
                    <td>is_manager</td>
                    <td>bool</td>
                    <td>是否为管理员。</td>
                </tr>
            </tbody>
        </table>
### 退出登录
- 路由：`/api/signout`
- 请求方法：`POST`
- 返回参数：
    - 示例
        ```json
        {
            "err_code": 0,
            "err_msg": ""
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>err_code</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>err_msg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
            </tbody>
        </table>
### 管理员发起志愿者活动
- 权限级别：管理员
- 路由：`/api/manager/publish/volunteer`
- 请求方法：`POST`
- 请求参数：
    - 示例：
        ```json
        {
            "title": "Some Fun",
            "details": "Help the lazy dog jump over the quick brown fox.",
            "action_time": "2018-09-16 00:00:00",
            "member": 80
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>title</td>
                    <td>string</td>
                    <td>活动标题。</td>
                </tr>
                <tr>
                    <td>details</td>
                    <td>string</td>
                    <td>活动详情。</td>
                </tr>
                <tr>
                    <td>action_time</td>
                    <td>string</td>
                    <td>志愿活动开始时间。晚于当前时间。</td>
                </tr>
                <tr>
                    <td>member</td>
                    <td>int</td>
                    <td>限制报名人数。</td>
                </tr>
            </tbody>
        </table>
- 返回参数：
    - 示例
        ```json
        {
            "err_code": 0,
            "err_msg": "",
            "id": 12
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>err_code</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>err_msg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
                <tr>
                    <td>id</td>
                    <td>int</td>
                    <td>发起活动的id。仅当成功时存在。</td>
                </tr>
            </tbody>
        </table>
### 管理员发起福利活动
- 权限级别：管理员
- 路由：`/api/manager/publish/award`
- 请求方法：`POST`
- 请求参数：
    - 示例：
        ```json
        {
            "title": "Ticket",
            "details": "None.",
            "book_time": "2018-09-25 19:00:00",
            "award": 40,
            "member_list": [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>title</td>
                    <td>string</td>
                    <td>活动标题。</td>
                </tr>
                <tr>
                    <td>details</td>
                    <td>string</td>
                    <td>活动详情。</td>
                </tr>
                <tr>
                    <td>book_time</td>
                    <td>string</td>
                    <td>福利领取时间。晚于当前时间。</td>
                </tr>
                <tr>
                    <td>award</td>
                    <td>int</td>
                    <td>奖品数。</td>
                </tr>
                <tr>
                    <td>member_list</td>
                    <td>array</td>
                    <td>限制的各个部门的领奖人数。部门依次为：0. 编辑部，1. 综合管理部，2. 综合新闻部，3. 外联部，4. 策划推广部，5. 节目部，6. 人力资源部，7. 技术部，8. 视频部，9. 视觉设计部。</td>
                </tr>
            </tbody>
        </table>
- 返回参数：
    - 示例
        ```json
        {
            "err_code": 0,
            "err_msg": "",
            "id": 12
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>err_code</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>err_msg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
                <tr>
                    <td>id</td>
                    <td>int</td>
                    <td>发起活动的id。仅当成功时存在。</td>
                </tr>
            </tbody>
        </table>
### 浏览活动情况
- 权限级别：用户
- 路由：`/api/user/query/activity`
- 请求方法：`POST`
- 请求参数：
    - 示例
        ```json
        {
            "type": 0,
            "start_id": 10,
            "number": 3
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>type</td>
                    <td>int</td>
                    <td>查询类型。为0时表示查找所有活动，为1时表示查找自己未报名的活动，为2时表示查找自己已报名的活动，为3时表示查找自己发起的活动。</td>
                </tr>
                <tr>
                    <td>start_id</td>
                    <td>int</td>
                    <td>查询活动id的起点。当start_id>=0时查找id<=start_id的活动，直到查找到number个活动或到达末尾为止；当start_id<0时，从当前id值最大的活动开始查找，直到查找到number个活动或到达末尾为止。</td>
                </tr>
                <tr>
                    <td>number</td>
                    <td>int</td>
                    <td>活动的数量。</td>
                </tr>
            </tbody>
        </table>
- 返回参数：
    - 示例
        ```json
        {
            "err_code": 0,
            "err_msg": "",
            "data": {
                "is_end": false,
                "activities": [
                    {
                        "id": 9,
                        "is_publisher": true,
                        "registered": false,
                        "type": 0,
                        "title": "Some Fun",
                        "details": "Help the lazy dog jump over the quick brown fox.",
                        "action_time": "2018-09-26 00:00:00",
                        "member": 80,
                        "current_member": 23
                    },
                    {
                        "id": 8,
                        "is_publisher": true,
                        "registered": true,
                        "type": 1,
                        "title": "Ticket",
                        "details": "None.",
                        "book_time": "2018-09-25 19:00:00",
                        "award": 40,
                        "current_member": 37,
                        "is_department_full": false
                    },
                    {
                        "id": 6,
                        "is_publisher": false,
                        "registered": true,
                        "type": 0,
                        "title": "Some Fun",
                        "details": "Help the lazy dog jump over the quick brown fox.",
                        "action_time": "2018-09-16 00:00:00",
                        "member": 80,
                        "current_member": 80
                    }
                ]
            }
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>err_code</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>err_msg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
                <tr>
                    <td>is_end</td>
                    <td>bool</td>
                    <td>查询是否达到末尾。若为true，表示不能继续查询。</td>
                </tr>
                <tr>
                    <td>id</td>
                    <td>int</td>
                    <td>活动的id。</td>
                </tr>
                <tr>
                    <td>is_publisher</td>
                    <td>bool</td>
                    <td>是否为该活动发起人。</td>
                </tr>
                <tr>
                    <td>registered</td>
                    <td>bool</td>
                    <td>是否已报名该活动。</td>
                </tr>
                <tr>
                    <td>type</td>
                    <td>int</td>
                    <td>活动类型。0代表志愿者活动，1代表福利活动。</td>
                </tr>
                <tr>
                    <td>title</td>
                    <td>string</td>
                    <td>活动标题。</td>
                </tr>
                <tr>
                    <td>details</td>
                    <td>string</td>
                    <td>活动详情。</td>
                </tr>
                <tr>
                    <td>action_time</td>
                    <td>string</td>
                    <td>志愿活动开始时间。</td>
                </tr>
                <tr>
                    <td>book_time</td>
                    <td>string</td>
                    <td>福利领取时间。</td>
                </tr>
                <tr>
                    <td>member</td>
                    <td>int</td>
                    <td>限制报名人数。</td>
                </tr>
                <tr>
                    <td>award</td>
                    <td>int</td>
                    <td>奖品数。</td>
                </tr>
                <tr>
                    <td>current_member</td>
                    <td>int</td>
                    <td>已参与人数。</td>
                </tr>
                <tr>
                    <td>is_department_full</td>
                    <td>bool</td>
                    <td>所在部门名额是否已满。</td>
                </tr>
            </tbody>
        </table>
### 管理员查询各部门报名人数
- 权限级别：管理员
- 路由：`/api/manager/query/{activity_id}/department`
- 请求方法：`POST`
- 返回参数：
    - 示例
        ```json
        {
            "err_code": 0,
            "err_msg": "",
            "data": {
                "member_list": [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
                "current_member_list": [2, 6, 10, 7, 10, 8, 4, 3, 9, 10]
            }
        }
        ```
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>err_code</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>err_msg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
                <tr>
                    <td>member_list</td>
                    <td>array</td>
                    <td>限制的各个部门的领奖人数。仅当活动type为1时存在。部门依次为：0. 编辑部，1. 综合管理部，2. 综合新闻部，3. 外联部，4. 策划推广部，5. 节目部，6. 人力资源部，7. 技术部，8. 视频部，9. 视觉设计部。</td>
                </tr>
                <tr>
                    <td>current_member_list</td>
                    <td>array</td>
                    <td>各个部门已报名、领奖人数。部门次序同上。</td>
                </tr>
            </tbody>
        </table>
### 管理员浏览报名用户信息
- 权限级别：管理员
- 路由：`/api/manager/query/{activity_id}/userinfo`
- 请求方法：`POST`
- 请求参数：
    - 示例
        ```json
        {
            "start_ord": 21,
            "number": 3
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>start_ord</td>
                    <td>int</td>
                    <td>查询报名用户的起点。排序为按报名时间从先到后的顺序。查询机制类似于“浏览活动情况”。</td>
                </tr>
                <tr>
                    <td>number</td>
                    <td>int</td>
                    <td>查询活动的数量。</td>
                </tr>
            </tbody>
        </table>
- 返回参数：
    - 示例
        ```json
        {
            "err_code": 0,
            "err_msg": "",
            "data": {
                "is_end": true,
                "users": [
                    {
                        "student_id": "201720182019",
                        "name": "张三",
                        "department": "综合管理部",
                        "tele": "13110111011"
                    },
                    {
                        "student_id": "201720182020",
                        "name": "李四",
                        "department": "策划推广部",
                        "tele": "13111111011"
                    },
                    {
                        "student_id": "201720182021",
                        "name": "王五",
                        "department": "视觉设计部",
                        "tele": "13112111011"
                    }
                ]
            }
        }
        ```
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>err_code</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>err_msg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
                <tr>
                    <td>is_end</td>
                    <td>bool</td>
                    <td>是否达到末尾。若为true，表示不能继续查询。</td>
                </tr>
                <tr>
                    <td>student_id</td>
                    <td>string</td>
                    <td>学号。</td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>string</td>
                    <td>报名用户姓名。</td>
                </tr>
                <tr>
                    <td>department</td>
                    <td>string</td>
                    <td>报名用户所在部门。</td>
                </tr>
                <tr>
                    <td>tele</td>
                    <td>string</td>
                    <td>报名用户电话号码。</td>
                </tr>
            </tbody>
        </table>
### 管理员下载.csv文件
- 权限级别：管理员
- 路由：`/api/manager/download/{activity_id}`
- 请求方法：`POST`
### 用户报名
- 权限级别：用户
- 路由：`/api/user/register/{activity_id}`
- 请求方法：`POST`
- 返回参数：
    - 示例
        ```json
        {
            "err_code": 0,
            "err_msg": ""
        }
        ```
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>err_code</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>err_msg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
            </tbody>
        </table>
### 活动发起人修改志愿者活动（类型、标题不予修改，活动开始后活动不予修改）
- 权限级别：活动发起人
- 路由：`/api/publisher/modify/volunteer/{activity_id}`
- 请求方法：`POST`
- 请求参数：
    - 示例
        ```json
        {
            "details": "Help the lazy dog jump over the quick brown fox.",
            "action_time": "2018-09-16 00:00:00",
            "member": 80
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>details</td>
                    <td>string</td>
                    <td>活动详情。</td>
                </tr>
                <tr>
                    <td>action_time</td>
                    <td>string</td>
                    <td>志愿活动开始时间。晚于当前时间。</td>
                </tr>
                <tr>
                    <td>member</td>
                    <td>int</td>
                    <td>限制报名人数。为避免逻辑上踢掉已报名的人，应不小于之前的数值。</td>
                </tr>
            </tbody>
        </table>
- 返回参数：
    - 示例
        ```json
        {
            "err_code": 0,
            "err_msg": ""
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>err_code</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>err_msg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
            </tbody>
        </table>
### 活动发起人修改福利活动（类型、标题不予修改，活动开始后活动不予修改）
- 权限级别：活动发起人
- 路由：`/api/publisher/modify/award/{activity_id}`
- 请求方法：`POST`
- 请求参数：
    - 示例
        ```json
        {
            "details": "None.",
            "book_time": "2018-09-25 19:00:00",
            "award": 40,
            "member_list": [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>details</td>
                    <td>string</td>
                    <td>活动详情。</td>
                </tr>
                <tr>
                    <td>book_time</td>
                    <td>string</td>
                    <td>福利领取时间。晚于当前时间。</td>
                </tr>
                <tr>
                    <td>award</td>
                    <td>int</td>
                    <td>奖品数。</td>
                </tr>
                <tr>
                    <td>member_list</td>
                    <td>array</td>
                    <td>限制的各个部门的领奖人数。部门依次为：0. 编辑部，1. 综合管理部，2. 综合新闻部，3. 外联部，4. 策划推广部，5. 节目部，6. 人力资源部，7. 技术部，8. 视频部，9. 视觉设计部。</td>
                </tr>
            </tbody>
        </table>
- 返回参数：
    - 示例
        ```json
        {
            "err_code": 0,
            "err_msg": ""
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>err_code</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>err_msg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
            </tbody>
        </table>
### 活动发起人删除活动
- 权限级别：活动发起人
- 路由：`/api/publisher/delete/{activity_id}`
- 请求方法：`POST`
- 返回参数：
    - 示例
        ```json
        {
            "err_code": 0,
            "err_msg": ""
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>err_code</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>err_msg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
            </tbody>
        </table>
### 活动发起人随机补齐人数（只适用于志愿者活动）
- 权限级别：活动发起人
- 路由：`/api/publisher/roll/{activity_id}`
- 请求方法：`POST`
- 返回参数：
    - 示例
        ```json
        {
            "err_code": 0,
            "err_msg": ""
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>err_code</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>err_msg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
            </tbody>
        </table>