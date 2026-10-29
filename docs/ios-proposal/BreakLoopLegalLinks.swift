// PROPOSAL ONLY. Not applied to or built in the native repository.
// Add BreakLoopWebsiteURL to the app's Info.plist only after HTTPS domain ownership is verified.
// Do not include a guessed domain. Missing/invalid configuration disables all links.
import SwiftUI
import UIKit

struct BreakLoopLegalLinks: View {
    @Environment(\.openURL) private var openURL
    @Environment(\.locale) private var locale
    @State private var couldNotOpen = false

    private var isTurkish: Bool { locale.language.languageCode?.identifier == "tr" }
    private var origin: URL? {
        guard let raw = Bundle.main.object(forInfoDictionaryKey: "BreakLoopWebsiteURL") as? String,
              let components = URLComponents(string: raw),
              components.scheme == "https", let host = components.host,
              host.contains("."), !host.hasSuffix(".example"), !host.hasSuffix(".test"),
              components.user == nil, components.password == nil, components.port == nil,
              components.query == nil, components.fragment == nil,
              components.path.isEmpty || components.path == "/" else { return nil }
        return components.url
    }
    private func url(_ path: String) -> URL? {
        origin?.appendingPathComponent(isTurkish ? "tr" : "en").appendingPathComponent(path)
    }
    private func open(_ destination: URL) {
        openURL(destination) { accepted in
            guard !accepted else { return }
            // If a custom SwiftUI handler declined the link, try the system browser.
            UIApplication.shared.open(destination, options: [:]) { success in
                if !success { couldNotOpen = true }
            }
        }
    }
    private func row(_ en: String, _ tr: String, path: String) -> some View {
        Button { if let destination = url(path) { open(destination) } } label: {
            HStack {
                Text(isTurkish ? tr : en)
                Spacer()
                Image(systemName: "arrow.up.right").accessibilityHidden(true)
            }.frame(minHeight: 44)
        }
        .disabled(url(path) == nil)
        .accessibilityHint(isTurkish ? "Web tarayıcısında açılır" : "Opens in your web browser")
    }
    var body: some View {
        Section(isTurkish ? "Yasal Bilgiler ve Destek" : "Legal & Support") {
            row("Privacy Policy", "Gizlilik Politikası", path: "privacy")
            row("Support", "Destek", path: "support")
            row("Terms of Use", "Kullanım Koşulları", path: "terms")
            if origin == nil {
                Text(isTurkish ? "Doğrulanmış web adresi henüz ayarlanmadı." : "A verified website URL has not been configured.")
                    .font(.footnote).foregroundStyle(.secondary)
            }
        }
        .alert(isTurkish ? "Bağlantı açılamadı" : "Could not open link", isPresented: $couldNotOpen) {
            Button(isTurkish ? "Tamam" : "OK", role: .cancel) {}
        }
    }
}
