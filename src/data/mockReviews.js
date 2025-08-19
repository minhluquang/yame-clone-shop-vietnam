export const mockReviews = {
  "ao-thun-basic-trang": {
    averageRating: 4.6,
    totalReviews: 127,
    totalSales: 852,
    reviews: [
      {
        id: "r1",
        reviewerName: "Minh Anh",
        date: "2025-01-15",
        rating: 5,
        variant: "Trắng - L",
        comment: "Áo rất đẹp, chất liệu cotton mềm mại và thoáng mát. Mình rất hài lòng với sản phẩm này. Form áo vừa vặn, không quá rộng cũng không quá ôm. Sẽ mua thêm những màu khác.",
        images: ["/placeholder.svg", "/placeholder.svg"],
        helpful: 12
      },
      {
        id: "r2", 
        reviewerName: "Tuấn Việt",
        date: "2025-01-12",
        rating: 4,
        variant: "Trắng - M",
        comment: "Chất lượng tốt, giá cả hợp lý. Tuy nhiên áo hơi dài so với mong đợi. Nhìn chung vẫn đáng mua.",
        helpful: 8
      },
      {
        id: "r3",
        reviewerName: "Thu Hà",
        date: "2025-01-10", 
        rating: 5,
        variant: "Trắng - S",
        comment: "Áo đẹp lắm, mặc rất thoải mái. Màu trắng rất dễ phối đồ. Shop giao hàng nhanh, đóng gói cẩn thận.",
        images: ["/placeholder.svg"],
        helpful: 6
      },
      {
        id: "r4",
        reviewerName: "Hoàng Nam",
        date: "2025-01-08",
        rating: 4,
        variant: "Trắng - XL", 
        comment: "Áo ok, chất liệu tốt. Tuy nhiên cổ áo hơi rộng. Giao hàng đúng hẹn.",
        helpful: 4
      },
      {
        id: "r5",
        reviewerName: "Linh Chi",
        date: "2025-01-05",
        rating: 5,
        variant: "Trắng - M",
        comment: "Rất hài lòng! Áo mềm mại, thấm hút mồ hôi tốt. Form đẹp, mặc lên người rất hợp. Giá cả phù hợp với chất lượng.",
        helpful: 9
      },
      {
        id: "r6",
        reviewerName: "Đức Minh",
        date: "2025-01-03",
        rating: 3,
        variant: "Trắng - L",
        comment: "Áo bình thường, không có gì đặc biệt. Chất liệu cũng tạm được.",
        helpful: 2
      }
    ]
  },
  "quan-jean-nam-xanh": {
    averageRating: 4.3,
    totalReviews: 89,
    totalSales: 234,
    reviews: [
      {
        id: "r7",
        reviewerName: "Phú Quý", 
        date: "2025-01-14",
        rating: 5,
        variant: "Xanh đậm - 32",
        comment: "Quần jean chất lượng cao, form đẹp, màu xanh rất đẹp. Mặc rất thoải mái và bền.",
        images: ["/placeholder.svg"],
        helpful: 15
      },
      {
        id: "r8",
        reviewerName: "Thanh Tùng",
        date: "2025-01-11", 
        rating: 4,
        variant: "Xanh đậm - 30",
        comment: "Quần đẹp, vải dày dặn. Tuy nhiên hơi khó mặc vào lần đầu vì vải hơi cứng.",
        helpful: 7
      },
      {
        id: "r9",
        reviewerName: "Mai Lan",
        date: "2025-01-09",
        rating: 4,
        variant: "Xanh đậm - 28", 
        comment: "Mua cho chồng, anh ấy rất thích. Form chuẩn, chất vải tốt.",
        helpful: 5
      }
    ]
  }
};

export const getProductReviews = (productSlug) => {
  return mockReviews[productSlug] || {
    averageRating: 0,
    totalReviews: 0,
    totalSales: 0,
    reviews: []
  };
};