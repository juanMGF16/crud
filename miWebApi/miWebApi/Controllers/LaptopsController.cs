using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using miWebApi.Entidades;

namespace miWebApi.Controllers
{
    [Route("api/laptops")]
    [ApiController]
    public class LaptopsController: ControllerBase
    {
        private readonly ApplicationDbContext context;

        public LaptopsController(ApplicationDbContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public async Task<List<Laptop>> Get()
        {
            return await context.Laptops.ToListAsync();
        }
        [HttpGet("{nombre}/existe")]
        public async Task<ActionResult<bool>> ExisteLaptopNombre(string nombre)
        {
            await Task.Delay(1000);
            return await context.Laptops.AnyAsync(x => x.Nombre == nombre);
        }

        [HttpGet("{id:int}", Name = "ObtenerLaptopId")]
        public async Task<ActionResult<Laptop>> Get(int id)
        {

            var laptop = await context.Laptops.FirstOrDefaultAsync(x => x.Id == id);

            if (laptop == null)
            {
                return NotFound();
            }
            return laptop;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Laptop laptop)
        {
            var yaExisteNombre = await context.Laptops.AnyAsync(x => x.Nombre == laptop.Nombre);

            if (yaExisteNombre)
            {
                var mensajeDeError = $"Ya Existe una laptop con el nombre {laptop.Nombre}";
                ModelState.AddModelError(nameof(laptop.Nombre), mensajeDeError);
                return ValidationProblem(ModelState);
            }

            context.Add(laptop);
            await context.SaveChangesAsync();
            return CreatedAtRoute("ObtenerLaptopId", new {id  = laptop.Id}, laptop);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] Laptop laptop)
        {
            var existeLaptop = await context.Laptops.AnyAsync(x => x.Id == id);
            if (!existeLaptop)
            {
                return NotFound();
            }

            var yaExisteNombre = await context.Laptops.AllAsync(x => x.Nombre == laptop.Nombre && x.Id != id);

            if (yaExisteNombre)
            {
                var mensajeDeError = $"Ya Existe una laptop con el nombre {laptop.Nombre}";
                ModelState.AddModelError(nameof(laptop.Nombre), mensajeDeError);
                return ValidationProblem(ModelState);
            }

            laptop.Id = id;
            context.Update(laptop);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var filasBorradas = await context.Laptops.Where(x => x.Id == id).ExecuteDeleteAsync();

            if (filasBorradas == 0)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
