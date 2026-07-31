import { useState } from "react";
import {
  LayoutGrid,
  Package,
  Tag,
  Layers,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  ChevronUp,
  ChevronDown,
  X,
  CheckCircle,
  AlertCircle,
  BarChart3,
  ShoppingCart,
  DollarSign,
  Users,
  Upload,
  ArrowUpRight,
} from "lucide-react";
import logo from "../assets/logo.png";
// ─── Types ───────────────────────────────────────────────────────────────────

type Page = "listings" | "register";
type Tab = "products" | "brands" | "categories";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive" | "draft";
  sku: string;
  image: string;
}

interface Brand {
  id: string;
  name: string;
  country: string;
  products: number;
  status: "active" | "inactive";
  logo: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  products: number;
  parent: string | null;
  status: "active" | "inactive";
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const initialProducts: Product[] = [
  { id: "P-001", name: "Camiseta SHARK OCEAN", brand: "Gymshark", category: "Camisetas", price: 1299.99, stock: 42, status: "active", sku: "NHX-001", image: "https://images.unsplash.com/photo-1524673360092-e07b7ae58845?w=80&h=80&fit=crop&auto=format" },
  { id: "P-002", name: "Short PREDATOR PRO", brand: "YoungLA", category: "Shorts", price: 349.00, stock: 128, status: "active", sku: "QSD-4TB", image: "https://cdn.shopify.com/s/files/1/1367/5201/files/GSxBratzShortGSDayglowPeachB6B3J_OBXB_6119_V2_3840x.jpg?v=1778834930" },
  { id: "P-003", name: "Tirante APEX TANK", brand: "Purefit", category: "Tirantes", price: 2199.00, stock: 15, status: "active", sku: "HD27-4K", image: "https://cdn.shopify.com/s/files/1/1367/5201/files/BlushSeamlessOmbreBlurredSSShrugGSFocusPinkSorbetYellowB6B1O_KDHQ_6560_2af1feeb-933d-4b4c-a810-4b03135ab7a1_3840x.jpg?v=1780321550" },
  { id: "P-004", name: "Zapatilla SHARK X1", brand: "DarcSport", category: "Zapatillas", price: 189.00, stock: 0, status: "inactive", sku: "ERK-001", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop&auto=format" },
  { id: "P-005", name: "Gorro YOUNGSHARK SNAPBACK", brand: "Purefit", category: "Gorros", price: 89.99, stock: 74, status: "active", sku: "FCS-002", image: "https://cdn.shopify.com/s/files/1/1367/5201/files/images-SharkheadCapGSHeavyBlueI1A6R_UCTN_0206_V1_3840x.jpg?v=1759484967" },
  { id: "P-006", name: "Camiseta DEEP OCEAN", brand: "Gymshark", category: "Zapatillas", price: 3499.00, stock: 8, status: "draft", sku: "SGX-RTX9", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop&auto=format" },
  { id: "P-007", name: "Camiseta SHARK CORE", brand: "Purefit", category: "Camisetas", price: 59.99, stock: 200, status: "active", sku: "ICP-65W", image: "https://cdn.shopify.com/s/files/1/1367/5201/files/SummerTrainT_ShirtGSSuper_SetPinkA4C5I_KDFW_0323_3840x.jpg?v=1779183941" },
  { id: "P-008", name: "Gorro YOUNGSHARK BLACK", brand: "YoungLA", category: "Tirantes", price: 799.00, stock: 21, status: "active", sku: "PMC-BLK", image: "https://images.unsplash.com/photo-1781720077891-4e90c15b972c?w=80&h=80&fit=crop&auto=format" },
];

const initialBrands: Brand[] = [
  { id: "B-001", name: "Gymshark", country: "USA", products: 18, status: "active", logo: "NT" },
  { id: "B-002", name: "YoungLA", country: "Germany", products: 12, status: "active", logo: "DF" },
  { id: "B-003", name: "Purefit", country: "Japan", products: 9, status: "active", logo: "VC" },
  { id: "B-004", name: "DarcSport", country: "South Korea", products: 5, status: "inactive", logo: "KT" },
];

const initialCategories: Category[] = [
  { id: "C-001", name: "Camisetas", slug: "camisetas", products: 11, parent: null, status: "active" },
  { id: "C-002", name: "Shorts", slug: "shorts", products: 23, parent: null, status: "active" },
  { id: "C-003", name: "Tirantes", slug: "tirantes", products: 8, parent: null, status: "active" },
  { id: "C-004", name: "Zapatillas", slug: "zapatillas", products: 34, parent: null, status: "active" },
  { id: "C-005", name: "Gorros", slug: "gorros", products: 6, parent: "Peripherals", status: "active" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, delta }: { icon: any; label: string; value: string; delta: string }) {
  return (
    <div className="relative bg-card border border-border rounded-sm p-5 overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-xs font-mono uppercase tracking-widest mb-2">{label}</p>
          <p className="text-2xl font-mono font-semibold text-foreground">{value}</p>
          <p className="text-xs text-blue-400 mt-1 flex items-center gap-1">
            <ArrowUpRight size={11} />
            {delta}
          </p>
        </div>
        <div className="p-2.5 rounded-sm bg-blue-500/10 border border-blue-500/20">
          <Icon size={18} className="text-blue-400" />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    inactive: "text-red-400 bg-red-400/10 border-red-400/20",
    draft: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest border rounded-sm ${map[status] ?? "text-muted-foreground bg-muted border-border"}`}>
      {status}
    </span>
  );
}

function SortIcon({ field, sort }: { field: string; sort: { field: string; dir: "asc" | "desc" } }) {
  if (sort.field !== field) return <ChevronUp size={12} className="text-muted-foreground opacity-30" />;
  return sort.dir === "asc" ? <ChevronUp size={12} className="text-blue-400" /> : <ChevronDown size={12} className="text-blue-400" />;
}

// ─── Products Table ───────────────────────────────────────────────────────────

function ProductsTable({ products, onDelete }: { products: Product[]; onDelete: (id: string) => void }) {
  const [sort, setSort] = useState<{ field: string; dir: "asc" | "desc" }>({ field: "id", dir: "asc" });
  const [search, setSearch] = useState("");

  const toggle = (f: string) => setSort(s => ({ field: f, dir: s.field === f && s.dir === "asc" ? "desc" : "asc" }));

  const filtered = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const va = (a as any)[sort.field];
      const vb = (b as any)[sort.field];
      return sort.dir === "asc" ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nombre o SKU..."
            className="w-full bg-input-background border border-border rounded-sm pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-blue-500/30 text-xs font-mono transition-all">
          <Filter size={13} />
          FILTRAR
        </button>
      </div>

      <div className="overflow-x-auto rounded-sm border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary border-b border-border">
              <th className="px-4 py-3 text-xs font-mono text-muted-foreground tracking-widest w-14">IMG</th>
              {[["id", "ID"], ["name", "PRODUCTO"], ["brand", "MARCA"], ["category", "CATEGORÍA"], ["price", "PRECIO"], ["stock", "STOCK"], ["status", "ESTADO"]].map(([f, l]) => (
                <th
                  key={f}
                  onClick={() => toggle(f)}
                  className="text-left px-4 py-3 text-xs font-mono text-muted-foreground tracking-widest cursor-pointer select-none hover:text-foreground transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    {l}
                    <SortIcon field={f} sort={sort} />
                  </span>
                </th>
              ))}
              <th className="px-4 py-3 text-xs font-mono text-muted-foreground tracking-widest text-right">OPS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr
                key={p.id}
                className="border-b border-border/50 hover:bg-blue-500/5 transition-colors group"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <td className="px-4 py-3">
                  <div className="w-10 h-10 rounded-sm bg-secondary border border-border overflow-hidden shrink-0">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-blue-400">{p.id}</td>
                <td className="px-4 py-3">
                  <div className="text-foreground font-medium">{p.name}</div>
                  <div className="text-muted-foreground text-xs font-mono">{p.sku}</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{p.brand}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{p.category}</td>
                <td className="px-4 py-3 font-mono text-foreground">${p.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-xs ${p.stock === 0 ? "text-red-400" : p.stock < 20 ? "text-amber-400" : "text-foreground"}`}>
                    {p.stock === 0 ? "SIN STOCK" : p.stock}
                  </span>
                </td>
                <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-sm border border-border hover:border-blue-500/40 hover:text-blue-400 text-muted-foreground transition-all">
                      <Edit2 size={12} />
                    </button>
                    <button onClick={() => onDelete(p.id)} className="p-1.5 rounded-sm border border-border hover:border-red-500/40 hover:text-red-400 text-muted-foreground transition-all">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="flex items-center justify-center py-12 text-muted-foreground text-sm font-mono">
            // NO SE ENCONTRARON RESULTADOS
          </div>
        )}
      </div>
      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
        <span>{filtered.length} registro{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}</span>
        <span>Mostrando {filtered.length} de {products.length}</span>
      </div>
    </div>
  );
}

// ─── Brands Table ─────────────────────────────────────────────────────────────

function BrandsTable({ brands, onDelete }: { brands: Brand[]; onDelete: (id: string) => void }) {
  const [search, setSearch] = useState("");
  const filtered = brands.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar marcas..."
          className="w-full bg-input-background border border-border rounded-sm pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(b => (
          <div key={b.id} className="bg-card border border-border rounded-sm p-4 hover:border-blue-500/30 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-mono text-xs font-bold text-blue-400">
                  {b.logo}
                </div>
                <div>
                  <p className="font-mono font-semibold text-foreground text-sm">{b.name}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{b.country}</p>
                </div>
              </div>
              <StatusBadge status={b.status} />
            </div>
            <div className="relative mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-mono">PRODUCTOS</p>
                <p className="text-lg font-mono font-semibold text-foreground">{b.products}</p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded-sm border border-border hover:border-blue-500/40 hover:text-blue-400 text-muted-foreground transition-all">
                  <Edit2 size={12} />
                </button>
                <button onClick={() => onDelete(b.id)} className="p-1.5 rounded-sm border border-border hover:border-red-500/40 hover:text-red-400 text-muted-foreground transition-all">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Categories Table ─────────────────────────────────────────────────────────

function CategoriesTable({ categories, onDelete }: { categories: Category[]; onDelete: (id: string) => void }) {
  const [search, setSearch] = useState("");
  const filtered = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar categorías..."
          className="w-full bg-input-background border border-border rounded-sm pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
        />
      </div>
      <div className="overflow-x-auto rounded-sm border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary border-b border-border">
              {["ID", "NOMBRE", "SLUG", "PADRE", "PRODUCTOS", "ESTADO"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-mono text-muted-foreground tracking-widest">{h}</th>
              ))}
              <th className="px-4 py-3 text-xs font-mono text-muted-foreground tracking-widest text-right">OPS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-b border-border/50 hover:bg-blue-500/5 transition-colors group">
                <td className="px-4 py-3 font-mono text-xs text-blue-400">{c.id}</td>
                <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">/{c.slug}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{c.parent ?? <span className="text-blue-400/50 font-mono text-xs">ROOT</span>}</td>
                <td className="px-4 py-3 font-mono text-foreground">{c.products}</td>
                <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-sm border border-border hover:border-blue-500/40 hover:text-blue-400 text-muted-foreground transition-all">
                      <Edit2 size={12} />
                    </button>
                    <button onClick={() => onDelete(c.id)} className="p-1.5 rounded-sm border border-border hover:border-red-500/40 hover:text-red-400 text-muted-foreground transition-all">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Form Fields ──────────────────────────────────────────────────────────────

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted-foreground/60 font-mono">{hint}</p>}
    </div>
  );
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="bg-input-background border border-border rounded-sm px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all w-full"
    />
  );
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="bg-input-background border border-border rounded-sm px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all w-full appearance-none cursor-pointer"
    >
      {children}
    </select>
  );
}

function Textarea({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={4}
      className="bg-input-background border border-border rounded-sm px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all w-full resize-none"
    />
  );
}

// ─── Product Form ─────────────────────────────────────────────────────────────

function ProductForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ name: "", sku: "", brand: "", category: "", price: "", stock: "", description: "", status: "active" });
  const [submitted, setSubmitted] = useState(false);

  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ name: "", sku: "", brand: "", category: "", price: "", stock: "", description: "", status: "active" }); }, 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {submitted && (
        <div className="flex items-center gap-3 px-4 py-3 bg-emerald-400/10 border border-emerald-400/30 rounded-sm text-emerald-400 text-sm font-mono">
          <CheckCircle size={16} />
          Producto registrado exitosamente
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nombre del producto" hint="Nombre visible al cliente">
          <Input value={form.name} onChange={set("name")} placeholder="Ej: Neural Headset Pro X" required />
        </Field>
        <Field label="SKU" hint="Código único de referencia">
          <Input value={form.sku} onChange={set("sku")} placeholder="Ej: NHX-001" required />
        </Field>
        <Field label="Marca">
          <Select value={form.brand} onChange={set("brand")} required>
            <option value="">— Seleccionar marca —</option>
            {initialBrands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
          </Select>
        </Field>
        <Field label="Categoría">
          <Select value={form.category} onChange={set("category")} required>
            <option value="">— Seleccionar categoría —</option>
            {initialCategories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </Select>
        </Field>
        <Field label="Precio (USD)">
          <Input type="number" step="0.01" min="0" value={form.price} onChange={set("price")} placeholder="0.00" required />
        </Field>
        <Field label="Stock inicial">
          <Input type="number" min="0" value={form.stock} onChange={set("stock")} placeholder="0" required />
        </Field>
      </div>
      <Field label="Descripción">
        <Textarea value={form.description} onChange={set("description") as any} placeholder="Descripción del producto para el catálogo..." />
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Estado">
          <Select value={form.status} onChange={set("status")}>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
            <option value="draft">Borrador</option>
          </Select>
        </Field>
        <Field label="Imagen del producto">
          <div className="flex items-center justify-center border border-dashed border-border rounded-sm h-[42px] cursor-pointer hover:border-blue-500/40 transition-all group">
            <span className="flex items-center gap-2 text-xs font-mono text-muted-foreground group-hover:text-blue-400 transition-colors">
              <Upload size={13} />
              SUBIR IMAGEN
            </span>
          </div>
        </Field>
      </div>
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
        <button type="button" onClick={() => setForm({ name: "", sku: "", brand: "", category: "", price: "", stock: "", description: "", status: "active" })}
          className="px-4 py-2 text-xs font-mono text-muted-foreground border border-border rounded-sm hover:border-blue-500/30 hover:text-foreground transition-all">
          LIMPIAR
        </button>
        <button type="submit"
          className="px-6 py-2 text-xs font-mono bg-blue-600 text-white rounded-sm hover:bg-blue-500 active:bg-blue-700 transition-all flex items-center gap-2 border border-blue-500/50">
          <Plus size={13} />
          REGISTRAR PRODUCTO
        </button>
      </div>
    </form>
  );
}

// ─── Brand Form ───────────────────────────────────────────────────────────────

function BrandForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ name: "", country: "", website: "", status: "active" });
  const [submitted, setSubmitted] = useState(false);
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ name: "", country: "", website: "", status: "active" }); }, 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {submitted && (
        <div className="flex items-center gap-3 px-4 py-3 bg-emerald-400/10 border border-emerald-400/30 rounded-sm text-emerald-400 text-sm font-mono">
          <CheckCircle size={16} />
          Marca registrada exitosamente
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nombre de la marca">
          <Input value={form.name} onChange={set("name")} placeholder="Ej: NeuraTech" required />
        </Field>
        <Field label="País de origen">
          <Input value={form.country} onChange={set("country")} placeholder="Ej: Alemania" required />
        </Field>
        <Field label="Sitio web">
          <Input type="url" value={form.website} onChange={set("website")} placeholder="https://brand.com" />
        </Field>
        <Field label="Estado">
          <Select value={form.status} onChange={set("status")}>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </Select>
        </Field>
      </div>
      <Field label="Logo de la marca">
        <div className="flex items-center justify-center border border-dashed border-border rounded-sm h-24 cursor-pointer hover:border-blue-500/40 transition-all group">
          <span className="flex flex-col items-center gap-2 text-xs font-mono text-muted-foreground group-hover:text-blue-400 transition-colors">
            <Upload size={20} />
            SUBIR LOGO (SVG, PNG — máx 2MB)
          </span>
        </div>
      </Field>
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
        <button type="button" onClick={() => setForm({ name: "", country: "", website: "", status: "active" })}
          className="px-4 py-2 text-xs font-mono text-muted-foreground border border-border rounded-sm hover:border-blue-500/30 hover:text-foreground transition-all">
          LIMPIAR
        </button>
        <button type="submit"
          className="px-6 py-2 text-xs font-mono bg-blue-600 text-white rounded-sm hover:bg-blue-500 transition-all flex items-center gap-2 border border-blue-500/50">
          <Plus size={13} />
          REGISTRAR MARCA
        </button>
      </div>
    </form>
  );
}

// ─── Category Form ────────────────────────────────────────────────────────────

function CategoryForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ name: "", slug: "", parent: "", description: "", status: "active" });
  const [submitted, setSubmitted] = useState(false);
  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));

  const autoSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const handleNameChange = (e: any) => setForm(f => ({ ...f, name: e.target.value, slug: autoSlug(e.target.value) }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ name: "", slug: "", parent: "", description: "", status: "active" }); }, 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {submitted && (
        <div className="flex items-center gap-3 px-4 py-3 bg-emerald-400/10 border border-emerald-400/30 rounded-sm text-emerald-400 text-sm font-mono">
          <CheckCircle size={16} />
          Categoría registrada exitosamente
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nombre de la categoría">
          <Input value={form.name} onChange={handleNameChange} placeholder="Ej: Wearables" required />
        </Field>
        <Field label="Slug (URL)" hint="Generado automáticamente">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-mono">/</span>
            <Input value={form.slug} onChange={set("slug")} placeholder="wearables" className="pl-6" required />
          </div>
        </Field>
        <Field label="Categoría padre">
          <Select value={form.parent} onChange={set("parent")}>
            <option value="">— Sin padre (raíz) —</option>
            {initialCategories.filter(c => !c.parent).map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </Select>
        </Field>
        <Field label="Estado">
          <Select value={form.status} onChange={set("status")}>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </Select>
        </Field>
      </div>
      <Field label="Descripción">
        <Textarea value={form.description} onChange={set("description") as any} placeholder="Descripción de esta categoría..." />
      </Field>
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
        <button type="button" onClick={() => setForm({ name: "", slug: "", parent: "", description: "", status: "active" })}
          className="px-4 py-2 text-xs font-mono text-muted-foreground border border-border rounded-sm hover:border-blue-500/30 hover:text-foreground transition-all">
          LIMPIAR
        </button>
        <button type="submit"
          className="px-6 py-2 text-xs font-mono bg-blue-600 text-white rounded-sm hover:bg-blue-500 transition-all flex items-center gap-2 border border-blue-500/50">
          <Plus size={13} />
          REGISTRAR CATEGORÍA
        </button>
      </div>
    </form>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ page, onPageChange }: { page: Page; onPageChange: (p: Page) => void }) {
  const navItems = [
    { id: "listings" as Page, label: "LISTADOS", icon: LayoutGrid, hint: "Productos · Marcas · Categorías" },
    { id: "register" as Page, label: "REGISTRAR", icon: Plus, hint: "Nuevo registro" },
  ];

  return (
    <aside className="w-60 shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-sidebar-border">
        <img src={logo} alt="logo" />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        <p className="px-2 py-1.5 text-[9px] font-mono text-muted-foreground tracking-[0.2em] uppercase mb-2">Navegación</p>
        {navItems.map(item => {
          const active = page === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-start gap-3 px-3 py-3 rounded-sm text-left transition-all group ${
                active
                  ? "bg-blue-600/15 border border-blue-500/25 text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent"
              }`}
            >
              <item.icon size={15} className={active ? "text-blue-400 mt-0.5" : "mt-0.5 group-hover:text-foreground"} />
              <div>
                <p className="text-xs font-mono font-semibold tracking-widest">{item.label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{item.hint}</p>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-sm bg-blue-500/20 border border-blue-500/30 flex items-center justify-center font-mono text-xs text-blue-400 font-bold">
            AD
          </div>
          <div>
            <p className="text-xs font-mono text-foreground">Admin Dashboard</p>
            <p className="text-[10px] text-muted-foreground font-mono">admin@youngshark.pe</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Page: Listings ───────────────────────────────────────────────────────────

function ListingsPage() {
  const [tab, setTab] = useState<Tab>("products");
  const [products, setProducts] = useState(initialProducts);
  const [brands, setBrands] = useState(initialBrands);
  const [categories, setCategories] = useState(initialCategories);

  const tabs = [
    { id: "products" as Tab, label: "PRODUCTOS", icon: Package, count: products.length },
    { id: "brands" as Tab, label: "MARCAS", icon: Tag, count: brands.length },
    { id: "categories" as Tab, label: "CATEGORÍAS", icon: Layers, count: categories.length },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 min-h-full">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={Package} label="Total productos" value={products.length.toString()} delta="+3 este mes" />
        <StatCard icon={DollarSign} label="Valor inventario" value="$94,218" delta="+12.4% vs anterior" />
        <StatCard icon={Tag} label="Total marcas" value={brands.length.toString()} delta="+1 nueva" />
        <StatCard icon={BarChart3} label="Categorías activas" value={categories.filter(c => c.status === "active").length.toString()} delta="Todas verificadas" />
      </div>

      {/* Tabs */}
      <div className="flex flex-col gap-0">
        <div className="flex items-center gap-0 border-b border-border">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-mono tracking-widest transition-all border-b-2 -mb-px ${
                tab === t.id
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon size={13} />
              {t.label}
              <span className={`ml-1 px-1.5 py-0.5 rounded-sm text-[10px] font-mono ${tab === t.id ? "bg-blue-500/20 text-blue-300" : "bg-muted text-muted-foreground"}`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>
        <div className="bg-card border border-t-0 border-border rounded-b-sm p-5">
          {tab === "products" && <ProductsTable products={products} onDelete={id => setProducts(p => p.filter(x => x.id !== id))} />}
          {tab === "brands" && <BrandsTable brands={brands} onDelete={id => setBrands(b => b.filter(x => x.id !== id))} />}
          {tab === "categories" && <CategoriesTable categories={categories} onDelete={id => setCategories(c => c.filter(x => x.id !== id))} />}
        </div>
      </div>
    </div>
  );
}

// ─── Page: Register ───────────────────────────────────────────────────────────

function RegisterPage() {
  const [tab, setTab] = useState<Tab>("products");

  const tabs = [
    { id: "products" as Tab, label: "PRODUCTO", icon: Package },
    { id: "brands" as Tab, label: "MARCA", icon: Tag },
    { id: "categories" as Tab, label: "CATEGORÍA", icon: Layers },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 min-h-full">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-mono font-semibold text-foreground">REGISTRAR</h1>
          <p className="text-muted-foreground text-sm mt-1">Añade nuevos productos, marcas y categorías al catálogo</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border rounded-sm px-3 py-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          SISTEMA ACTIVO
        </div>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Tab Selector */}
        <div className="lg:w-52 shrink-0 flex lg:flex-col gap-2">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm text-left text-xs font-mono tracking-widest transition-all border flex-1 lg:flex-none ${
                tab === t.id
                  ? "bg-blue-600/15 border-blue-500/30 text-blue-400"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-blue-500/20"
              }`}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}

          {/* Info panel */}
          <div className="hidden lg:block mt-4 p-4 bg-blue-500/5 border border-blue-500/15 rounded-sm">
            <p className="text-xs font-mono text-blue-400 mb-2">// INFO</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {tab === "products" && "Los productos son vinculados a una marca y categoría existente. El SKU debe ser único en el sistema."}
              {tab === "brands" && "Las marcas agrupan productos del mismo fabricante. El logo es opcional pero recomendado."}
              {tab === "categories" && "Las categorías pueden ser raíz o anidadas bajo otra categoría. El slug se genera automáticamente."}
            </p>
          </div>
        </div>

        {/* Form Panel */}
        <div className="flex-1 bg-card border border-border rounded-sm p-6">
          <div className="mb-6 pb-4 border-b border-border">
            <h2 className="text-sm font-mono font-semibold text-foreground flex items-center gap-2">
              {tab === "products" && <><Package size={14} className="text-blue-400" /> NUEVO PRODUCTO</>}
              {tab === "brands" && <><Tag size={14} className="text-blue-400" /> NUEVA MARCA</>}
              {tab === "categories" && <><Layers size={14} className="text-blue-400" /> NUEVA CATEGORÍA</>}
            </h2>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              {tab === "products" && "Completa los datos del producto para añadirlo al catálogo"}
              {tab === "brands" && "Registra una nueva marca en el sistema"}
              {tab === "categories" && "Crea una nueva categoría o subcategoría"}
            </p>
          </div>
          {tab === "products" && <ProductForm onSuccess={() => {}} />}
          {tab === "brands" && <BrandForm onSuccess={() => {}} />}
          {tab === "categories" && <CategoryForm onSuccess={() => {}} />}
        </div>
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("listings");

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Ambient grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: "linear-gradient(rgba(37,99,235,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Blue glow top-left */}
      <div className="fixed -top-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none z-0" />

      <Sidebar page={page} onPageChange={setPage} />

      <main className="flex-1 overflow-y-auto relative z-10">
        {/* Topbar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="text-blue-400">NEXUS</span>
            <span>/</span>
            <span>{page === "listings" ? "LISTADOS" : "REGISTRAR"}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs font-mono text-muted-foreground hidden sm:block">
              {new Date().toLocaleDateString("es-PE", { weekday: "short", day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 border border-emerald-400/20 bg-emerald-400/5 px-2 py-1 rounded-sm">
              <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </div>
          </div>
        </div>

        {page === "listings" && <ListingsPage />}
        {page === "register" && <RegisterPage />}
      </main>
    </div>
  );
}
