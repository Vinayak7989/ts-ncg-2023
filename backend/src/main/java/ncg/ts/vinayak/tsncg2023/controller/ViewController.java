package ncg.ts.vinayak.tsncg2023.controller;

import ncg.ts.vinayak.tsncg2023.model.View;
import ncg.ts.vinayak.tsncg2023.repository.ViewRepository;
import ncg.ts.vinayak.tsncg2023.services.ViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class ViewController {
    @Autowired
    private ViewService viewService;

    @PostMapping("/views")
    public ResponseEntity<View> createView(@RequestBody View newView) {
        return new ResponseEntity<View>(viewService.createView(newView), HttpStatus.CREATED);
    }

    @GetMapping("/views")
    public List<View> getAllViews() {
        return viewService.getAllViews();
    }

    @GetMapping("/view/{id}")
    public Optional<View> getViewById(@PathVariable Long id) {
        return viewService.getViewById(id);
    }

    @PutMapping("/view/{id}")
    Optional<View> updateView(@RequestBody  View updatedView, @PathVariable Long id) {
        return viewService.updateView(updatedView, id);
    }

    @DeleteMapping("/view/{id}")
    String deleteUser(@PathVariable Long id){
        return viewService.deleteView(id);
    }
}