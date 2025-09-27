export function Footer() {
    return (
        <footer className="bg-gray-600 text-gray-300 py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-4">

                <div>
                    <h4 className="text-white font-semibold mb-4">COMPANY</h4>
                    <ul className="space-y-2">
                        <li><a href="/about" className="hover:text-white">About us</a></li>
                        <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
                        <li><a href="/coverage" className="hover:text-white">Coverage area</a></li>
                        <li><a href="/bill-payment" className="hover:text-white">Bill Payment</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">SUPPORT</h4>
                    <ul className="space-y-2">
                        <li><a href="/how-to-pay" className="hover:text-white">How to Pay</a></li>

                        <li><a href="/contact" className="hover:text-white">Contact us</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">QUICK LINKS</h4>
                    <ul className="space-y-2">
                        <li><a href="https://www.facebook.com/profile.php?id=61561435937177" className="hover:text-white">Facebook Page</a></li>
                    </ul>
                    <ul className="space-y-2">
                        <li><a href="https://www.instagram.com/rangaudiovisual" className="hover:text-white">Instagram</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4">LEGAL</h4>
                    <ul className="space-y-2">
                        <li><a href="/terms" className="hover:text-white">Terms & Conditions</a></li>
                        <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                        <li><a href="/returns" className="hover:text-white">Return & Refund</a></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-500 mt-12 pt-6">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-sm text-gray-900">
                        © Rang Audio Visual 2025. All rights reserved.
                    </p>
                    <div className="flex space-x-2 mt-4 md:mt-0">
                        <img src="/visa.png" alt="Visa" className="h-6" />
                        <img src="/mastercard.png" alt="Mastercard" className="h-6" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
