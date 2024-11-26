import React from "react";

const payments = [
    {
        id: 1,
        amount: "100,000đ",
        time: "22:57 - 13/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Tô Vũ Minh Quân",
            description: "The ninety - Tô Vũ Minh Quân",
        },
    },
    {
        id: 2,
        amount: "100,000đ",
        time: "23:16 - 13/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Lê Khải Hoàn",
            description: "The ninety - Lê Khải Hoàn",
        },
    },
    {
        id: 3,
        amount: "100,000đ",
        time: "23:36 - 13/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Đào Trung Kiên",
            description: "The ninety - Đào Trung Kiên",
        },
    },
    {
        id: 4,
        amount: "100,000đ",
        time: "00:22 - 14/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Trần Thị Hồng Phúc",
            description: "The ninety - Trần Thị Hồng Phúc",
        },
    },
    {
        id: 5,
        amount: "100,000đ",
        time: "14:07 - 18/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Đoàn Minh Khôi",
            description: "The ninety - Đoàn Minh Khôi",
        },
    },
    {
        id: 6,
        amount: "100,000đ",
        time: "21:56 - 14/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Hoàng Sỹ Nguyên",
            description: "The ninety - Hoàng Sỹ Nguyên",
        },
    },
    {
        id: 6,
        amount: "100,000đ",
        time: "12:27 - 15/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Trần Thu Hà",
            description: "The ninety - Trần Thu Hà",
        },
    },
    {
        id: 7,
        amount: "100,000đ",
        time: "19:14 - 15/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Nguyễn Nhật Minh",
            description: "The ninety - Nguyễn Nhật Minh",
        },
    },
    {
        id: 8,
        amount: "100,000đ",
        time: "19:50 - 15/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Đinh Trần Nhật Minh",
            description: "The ninety - Đinh Trần Nhật Minh",
        },
    },
    {
        id: 9,
        amount: "100,000đ",
        time: "12:27 - 15/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Điền Thanh Thanh",
            description: "The ninety - Điền Thanh Thanh",
        },
    },
    {
        id: 10,
        amount: "100,000đ",
        time: "11:10 - 16/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Tran Hai Phong",
            description: "The ninety - Tran Hai Phong",
        },
    },
    {
        id: 11,
        amount: "100,000đ",
        time: "12:56 - 16/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Lâm Hồ Bân",
            description: "The ninety - Lâm Hồ Bân",
        },
    },
    {
        id: 12,
        amount: "100,000đ",
        time: "14:14 - 16/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Nguyễn Gia Hân",
            description: "The ninety - Nguyễn Gia Hân",
        },
    },
    {
        id: 13,
        amount: "100,000đ",
        time: "12:55 - 16/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Hồ Dương Trung Nguyên",
            description: "The ninety - Hồ Dương Trung Nguyên",
        },
    },
    {
        id: 14,
        amount: "100,000đ",
        time: "12:55 - 16/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Nguyễn Trương Khang Thuận",
            description: "The ninety - Nguyễn Trương Khang Thuận",
        },
    },
    {
        id: 15,
        amount: "100,000đ",
        time: "13:01 - 24/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Phạm Đức Thịnh",
            description: "The ninety - Pham Duc Thinh",
        },
    },
    {
        id: 16,
        amount: "100,000đ",
        time: "13:15 - 16/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Trương Minh Quang",
            description: "The ninety - Trương Minh Quang",
        },
    },
    {
        id: 17,
        amount: "100,000đ",
        time: "22:31 - 17/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Hà Quang Vinh",
            description: "The ninety - Hà Quang Vinh",
        },
    },
    {
        id: 18,
        amount: "100,000đ",
        time: "15:59 - 17/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Trần Hoàng Trung Anh",
            description: "The ninety - Trần Hoàng Trung Anh",
        },
    },
    {
        id: 19,
        amount: "100,000đ",
        time: "21:23 - 16/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Võ Minh Khôi",
            description: "The ninety - Võ Minh Khôi",
        },
    },
    {
        id: 20,
        amount: "100,000đ",
        time: "10:21 - 18/11/2024",
        transactionId: "72227392294",
        sender: {
            name: "Nguyễn Duy Mạnh",
            description: "The ninety - Nguyễn Duy Mạnh",
        },
    }
];

const Dashboard = () => {
    return (
        <div className="container py-4">
            <h1 className="mb-4">Danh sách giao dịch</h1>
            <table className="table table-bordered table-hover">
                <thead className="table-primary">
                    <tr>
                        <th>#</th>
                        <th>Người gửi</th>
                        <th>Thời gian gửi</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr key={payment.id}>
                            <td>{index + 1}</td>
                            <td className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 fw-bold">{payment.sender.name}</p>
                                    <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                                        {payment.sender.description}
                                    </p>
                                </div>
                            </td>
                            <td>{payment.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
