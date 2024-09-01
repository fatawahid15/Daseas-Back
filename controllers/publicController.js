const { Op } = require("sequelize");
const { User, Product, Category } = require("../models/index");

class Controller {
    static async readProductForPublic(req, res, next) {
        try {
            const { search, sort, filter, page } = req.query;

            const query = {
                where: {},
                order: ['id'],
                include: Category
            };

            if (search) {
                query.where.name = {
                    [Op.iLike]: `%${search}%`
                };
            }

            let limit = 1
            let currentPage = 1
            let pageNumber = 10

            if(page){
                if(page.size){
                    limit = page.size
                    query.limit = limit
                }

                if(page.number){
                    pageNumber = page.number
                    currentPage = page.number
                    query.offset = (pageNumber - 1) * limit
                }
            }

            if(!page){
                limit = 10
                query.limit = 10
                query.offset = 0
                currentPage = 1
            }

            if (filter) {
                query.where.categoryId = filter;
                query.include =  {
                    model: User,
                    attributes: {
                      exclude: ["password"],
                    },
                    
                  }
            }

            if (sort) {
                query.order = [['createdAt', sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']];
            }

            const { rows, count } = await Product.findAndCountAll(query);

            res.status(200).json({
                current_page: currentPage,
                data: rows,
                totalData: count,
                totalPage: Math.ceil(count / limit),
            })

        } catch (error) {
            next(error);
        }
    }

    static async getProductByIdForPublic(req, res, next) {
        try {
            const { id } = req.params;

            let product = await Product.findByPk(id);

            if (!product) {
                throw { name: "NotFound", id };
            }

            res.status(200).json({
                message: `Success getting product with id of ${id}`,
                data: product,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getCategory(req , res, next) {
        try {
            const category = await Category.findAll()
            
            res.status(200).json({category})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller;
