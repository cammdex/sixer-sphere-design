import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Minus, Plus, ShoppingBag, Trash2, X, Share2 } from "lucide-react";
import { MobileLayout } from "@/components/mobile-layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { merchandise } from "@/lib/gpl-data";
import { toast } from "sonner";
import tee from "@/assets/store-tee.jpg";
import cap from "@/assets/store-cap.jpg";
import tote from "@/assets/store-tote.jpg";

export const Route = createFileRoute("/store")({
  head: () => ({ meta: [
    { title: "Store — Sanchi UBL 2026" },
    { name: "description", content: "Shop Sanchi UBL cricket tees, caps and tote bags." },
    { property: "og:title", content: "Sanchi UBL 2026 Store" },
    { property: "og:description", content: "Browse cricket-inspired tees, caps and tote bags from Sanchi UBL." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: StorePage,
});

type Product = typeof merchandise[number];
type CartItem = { id: Product["id"]; size: string; quantity: number };
const images = { tee, cap, tote };
const categories = ["All", "T-shirts", "Caps", "Tote bags"] as const;
const currency = (value: number) => `₹${value.toLocaleString("en-IN")}`;

function readCart(): CartItem[] {
  try {
    const saved = JSON.parse(localStorage.getItem("sanchi-store-cart") ?? "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter((item): item is CartItem =>
      merchandise.some((p) => p.id === item?.id && p.sizes.some((size) => size === item?.size)) &&
      Number.isInteger(item?.quantity) && item.quantity > 0 && item.quantity <= 99
    );
  } catch { return []; }
}

function StorePage() {
  const [category, setCategory] = useState<typeof categories[number]>("All");
  const [sizes, setSizes] = useState<Record<string, string>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  useEffect(() => { setCart(readCart()); setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem("sanchi-store-cart", JSON.stringify(cart)); }, [cart, ready]);

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + (merchandise.find((p) => p.id === item.id)?.price ?? 0) * item.quantity, 0);
  const add = (product: Product) => {
    const size = sizes[product.id] ?? product.sizes[0];
    setCart((current) => {
      const found = current.find((item) => item.id === product.id && item.size === size);
      return found ? current.map((item) => item === found ? { ...item, quantity: Math.min(99, item.quantity + 1) } : item)
        : [...current, { id: product.id, size, quantity: 1 }];
    });
    toast.success(`${product.name} added to bag`);
  };
  const changeQuantity = (id: CartItem["id"], size: string, delta: number) => {
    setCart((current) => current.map((item) => item.id === id && item.size === size
      ? { ...item, quantity: Math.min(99, item.quantity + delta) } : item).filter((item) => item.quantity > 0));
  };
  const remove = (id: CartItem["id"], size: string) => setCart((current) => current.filter((item) => item.id !== id || item.size !== size));
  const shareOrder = async () => {
    const details = ["Sanchi UBL 2026 merchandise order", "", ...cart.map((item) => {
      const product = merchandise.find((p) => p.id === item.id);
      return `${product?.name ?? item.id} (${item.size}) × ${item.quantity} — ${currency((product?.price ?? 0) * item.quantity)}`;
    }), "", `Total: ${currency(total)}`].join("\n");
    try {
      if (navigator.share) await navigator.share({ title: "Sanchi UBL order", text: details });
      else { await navigator.clipboard.writeText(details); toast.success("Order summary copied"); }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast.error("Could not share order. Please try again.");
    }
  };

  return <MobileLayout title="The Store" showFab={false}>
    <div className="mt-4 flex items-start justify-between gap-3">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">Sanchi UBL / Official goods</p>
        <h1 className="mt-1 font-display text-2xl font-bold">The Store</h1>
      </div>
      <Button variant="outline" size="icon" className="relative h-11 w-11 shrink-0 rounded-lg bg-card" aria-label={`Open bag, ${count} items`} onClick={() => setCartOpen(true)}>
        <ShoppingBag className="h-5 w-5" />
        {count > 0 && <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">{count}</span>}
      </Button>
    </div>
    <div className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar" aria-label="Product categories">
      {categories.map((item) => <Button key={item} size="sm" variant={category === item ? "default" : "outline"} onClick={() => setCategory(item)} className="shrink-0 rounded-full">{item}</Button>)}
    </div>
    <div className="mt-5 grid grid-cols-2 gap-3 pb-8">
      {merchandise.filter((item) => category === "All" || item.category === category).map((product) => <article key={product.id} className="min-w-0 overflow-hidden rounded-lg border border-border bg-card">
        <div className="aspect-square overflow-hidden bg-secondary"><img src={images[product.id]} alt={product.name} width={816} height={816} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" /></div>
        <div className="p-3">
          <p className="text-[10px] font-semibold uppercase text-muted-foreground">{product.category}</p>
          <h2 className="mt-1 min-h-10 font-display text-sm font-bold leading-snug">{product.name}</h2>
          <p className="mt-1 font-display text-sm font-bold text-gold">{currency(product.price)}</p>
          <label htmlFor={`size-${product.id}`} className="mt-3 block text-[10px] font-semibold uppercase text-muted-foreground">Size</label>
          <select id={`size-${product.id}`} value={sizes[product.id] ?? product.sizes[0]} onChange={(e) => setSizes((current) => ({ ...current, [product.id]: e.target.value }))} className="mt-1 h-9 w-full rounded-md border border-input bg-background px-2 text-xs text-foreground">
            {product.sizes.map((size) => <option key={size}>{size}</option>)}
          </select>
          <Button onClick={() => add(product)} className="mt-3 h-9 w-full rounded-md px-2 text-xs"><Plus className="h-3.5 w-3.5" /> Add to bag</Button>
        </div>
      </article>)}
    </div>
    <Dialog open={cartOpen} onOpenChange={setCartOpen}>
      <DialogContent className="max-h-[85dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-lg bg-card p-5 shadow-xl [&>button]:hidden">
        <DialogHeader className="flex-row items-center justify-between space-y-0">
          <DialogTitle className="font-display text-xl">Your bag <span className="text-sm font-normal text-muted-foreground">({count})</span></DialogTitle>
          <Button variant="ghost" size="icon" aria-label="Close bag" onClick={() => setCartOpen(false)}><X /></Button>
        </DialogHeader>
        <DialogDescription className="sr-only">Review items, update quantities, and share your order summary.</DialogDescription>
        {cart.length === 0 ? <div className="py-12 text-center"><ShoppingBag className="mx-auto h-9 w-9 text-muted-foreground" /><p className="mt-3 text-sm text-muted-foreground">Your bag is empty.</p><Button variant="outline" className="mt-4" onClick={() => setCartOpen(false)}>Browse goods</Button></div> : <>
          <div className="mt-3 divide-y divide-border">
            {cart.map((item) => {
              const product = merchandise.find((p) => p.id === item.id);
              if (!product) return null;
              return <div key={`${item.id}-${item.size}`} className="flex gap-3 py-4">
                <img src={images[item.id]} alt="" width={72} height={72} className="h-18 w-18 rounded-md object-cover" />
                <div className="min-w-0 flex-1"><div className="font-display text-sm font-semibold">{product.name}</div><p className="text-xs text-muted-foreground">{item.size} · {currency(product.price)}</p>
                  <div className="mt-2 flex items-center gap-1"><Button variant="outline" size="icon" className="h-7 w-7" aria-label={`Remove one ${product.name}`} onClick={() => changeQuantity(item.id, item.size, -1)}><Minus /></Button><span className="w-7 text-center text-sm tabular-nums">{item.quantity}</span><Button variant="outline" size="icon" className="h-7 w-7" aria-label={`Add one ${product.name}`} disabled={item.quantity >= 99} onClick={() => changeQuantity(item.id, item.size, 1)}><Plus /></Button><Button variant="ghost" size="icon" className="ml-auto h-7 w-7 text-muted-foreground" aria-label={`Remove ${product.name} from bag`} onClick={() => remove(item.id, item.size)}><Trash2 /></Button></div>
                </div>
                <span className="text-sm font-bold">{currency(product.price * item.quantity)}</span>
              </div>;
            })}
          </div>
          <div className="flex justify-between border-t border-border pt-4 font-display font-bold"><span>Total</span><span>{currency(total)}</span></div>
          <Button onClick={shareOrder} className="h-11 w-full"><Share2 /> Share order summary</Button>
          <p className="text-center text-xs text-muted-foreground">Sharing an order summary does not place or pay for an order.</p>
        </>}
      </DialogContent>
    </Dialog>
  </MobileLayout>;
}
